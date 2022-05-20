import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, ObjectID, Repository } from 'typeorm';
import { ProposalDataDto } from './dto/proposal.dto';
import snapshot from '@snapshot-labs/snapshot.js';
import { Wallet } from 'ethers';

@Injectable()
export class SubdaoService {
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {}
  // relay subdao members vote results to main proposal
  async relayVote(proposalId: string) {
    // query sub proposal from db

    // vote on main proposal based on sub proposal's result
    const hub = 'https://hub.snapshot.org'; // or https://testnet.snapshot.org for testnet
    const client = new snapshot.Client712(hub);
    const wallet = new Wallet('');
    console.log(client);

    const receipt = await client.vote(wallet, wallet.address, {
      space: 'zunnoon.eth',
      proposal:
        '0xdd58ba33b3b4bcfc4f3db4d660c8a9622f9f4e77d92288155503afe45209d140',
      type: 'single-choice',
      choice: 1,
      metadata: JSON.stringify({}),
    });
    console.log('receipt', receipt);
  }

  // validate if subdao can use the given main proposal
  async validateMainProposal(proposalLink: string) {
    // https://snapshot.org/#/ens.eth/proposal/0x104eb11d42813fadc2b408856e8fa2c10e34dbb4a87abaa2f089ece124263f16
    const proposalId = proposalLink.split('/')[6];
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

    const proposalData: ProposalDataDto = response.data.data.proposal;
    // check if data exist
    if (!proposalData) return false;

    // get main proposal's vote token address
    let mainTokenAddress;
    for (const strategy of proposalData.strategies) {
      if (strategy.name == 'erc20-balance-of') {
        mainTokenAddress = strategy.params.address.toLowerCase();
      }
    }
  }
}
