import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import snapshot from '@snapshot-labs/snapshot.js';
import { Wallet } from 'ethers';
import { ethers } from 'ethers';

@Injectable()
export class RelayerService {
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {}

  async getBlockNumber() {
    const provider = ethers.getDefaultProvider('rinkeby');
    return await provider.getBlockNumber();
  }

  async getDomain(proposalId: string): Promise<string> {
    const query = `{\n  proposal(id: "${proposalId}") {\n space{id}\n }\n}\n`;

    const response = await firstValueFrom(
      this.httpService.post(
        this.configService.get<string>('graphUrl.snapshot'),
        {
          query,
          variables: null,
        },
      ),
    );

    const proposalData = response.data.data.proposal;
    const domain: string = proposalData.space.id;
    return domain;
  }

  async getVoters(proposalId: string) {
    const url = 'https://hub.snapshot.org/graphql';

    const data = {
      operationName: 'Votes',
      variables: {
        id: proposalId,
        orderBy: 'vp',
        orderDirection: 'desc',
        first: 30000,
        voter: '',
        skip: 0,
      },
      query:
        'query Votes($id: String!, $first: Int, $skip: Int, $orderBy: String, $orderDirection: OrderDirection, $voter: String) {\n  votes(\n    first: $first\n    skip: $skip\n    where: {proposal: $id, vp_gt: 0, voter: $voter}\n    orderBy: $orderBy\n    orderDirection: $orderDirection\n  ) {\n    ipfs\n    voter\n    choice\n    vp\n    vp_by_strategy\n  }\n}',
    };
    const res = await firstValueFrom(this.httpService.post(url, data));
    const votes = res.data.data.votes;
    return votes;
  }

  async getScores(space: string, strategies: any, addresses: string[]) {
    const snapshot = await this.getBlockNumber();
    const url = 'https://score.snapshot.org/api/scores';
    const data = {
      params: {
        space,
        network: '4',
        snapshot,
        strategies,
        addresses: addresses,
      },
    };
    const res = await firstValueFrom(this.httpService.post(url, data));

    return res.data.result.scores;
  }

  async getStrategies(proposalId): Promise<any[]> {
    const query = `{\n  proposal(id: "${proposalId}") {\n strategies{name, params}\n }\n}\n`;

    const response = await firstValueFrom(
      this.httpService.post(
        this.configService.get<string>('graphUrl.snapshot'),
        {
          query,
          variables: null,
        },
      ),
    );

    return response.data.data.proposal.strategies;
  }

  getMaxValueKey(obj: { [key: string]: number }): string {
    return Object.keys(obj).reduce((a, b) => (obj[a] > obj[b] ? a : b));
  }

  async getWinner(proposalId: string, subDomain: string) {
    // get voters
    const voters: any[] = await this.getVoters(proposalId);
    const choices: { [key: string]: number } = {};

    // get scores
    const scores: { [key: string]: number }[] = await this.getScores(
      subDomain,
      await this.getStrategies(proposalId),
      voters.map((item) => item.voter),
    );

    voters?.map((item) => {
      if (choices[item.choice] === undefined) {
        choices[item.choice] = 0;
      }
      console.log('a', item.voter, scores[0][item.voter]);
      choices[item.choice] = choices[item.choice] + scores[0][item.voter];
    });
    console.log('choices', choices);
    const winner = this.getMaxValueKey(choices);
    return winner;
  }

  // relay subdao members vote results to main proposal
  async relayVote(
    mainProposalId: string,
    subProposalId: string,
    subDomain: string,
  ) {
    // query sub proposal from db

    // vote on main proposal based on sub proposal's result
    const hub = 'https://hub.snapshot.org'; // or https://testnet.snapshot.org for testnet
    const client = new snapshot.Client712(hub);
    const wallet = new Wallet('');
    console.log(client);

    const mainDomain = await this.getDomain(mainProposalId);
    const winner = this.getWinner(subProposalId, subDomain);
    const receipt = await client.vote(wallet, wallet.address, {
      space: mainDomain,
      proposal: mainProposalId,
      type: 'single-choice',
      choice: +winner,
      metadata: JSON.stringify({}),
    });
    console.log('receipt', receipt);
  }
}
