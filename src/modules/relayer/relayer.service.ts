import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import snapshot from '@snapshot-labs/snapshot.js';
import { Wallet } from 'ethers';

@Injectable()
export class RelayerService {
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {}

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

  async getWinner(proposalId) {
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
  }

  // relay subdao members vote results to main proposal
  async relayVote(mainProposalId: string) {
    // query sub proposal from db

    // vote on main proposal based on sub proposal's result
    const hub = 'https://hub.snapshot.org'; // or https://testnet.snapshot.org for testnet
    const client = new snapshot.Client712(hub);
    const wallet = new Wallet('');
    console.log(client);

    const mainDomain = await this.getDomain(mainProposalId);

    const receipt = await client.vote(wallet, wallet.address, {
      space: mainDomain,
      proposal: mainProposalId,
      type: 'single-choice',
      choice: 1,
      metadata: JSON.stringify({}),
    });
    console.log('receipt', receipt);
  }
}
