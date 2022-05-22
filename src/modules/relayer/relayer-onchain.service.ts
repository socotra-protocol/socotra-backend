import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';

import snapshot from '@snapshot-labs/snapshot.js';
import SocotraBranchManagerABI from '../../abis/SocotraBranchManager.json';
import VoterABI from '../../abis/Voterabi.json';
import { ethers, Wallet } from 'ethers';
import { VoterAbi } from 'types/ethers-contracts/VoterAbi';

@Injectable()
export class RelayerService {
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
    private readonly relayerClient: any,
  ) {
    this.relayerClient = new Wallet(configService.get('relayer.privatekey'));
  }

  async submitVote(
    voterAddress: string,
    governor: string,
    proposalId: string,
    support: boolean,
  ) {
    const contract = new ethers.Contract(
      voterAddress,
      VoterABI,
      this.relayerClient,
    ) as VoterAbi;
    await contract.submitVote(governor, proposalId, support);
  }

  async bravoVote(
    voterAddress: string,
    governor: string,
    proposalId: string,
    support: number,
  ) {
    const contract = new ethers.Contract(
      voterAddress,
      VoterABI,
      this.relayerClient,
    ) as VoterAbi;
    await contract.bravoCastVote(governor, proposalId, support);
  }
}
