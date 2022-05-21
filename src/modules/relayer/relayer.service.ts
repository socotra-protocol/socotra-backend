import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';

import snapshot from '@snapshot-labs/snapshot.js';
import { Wallet } from 'ethers';

@Injectable()
export class RelayerService {
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
}
