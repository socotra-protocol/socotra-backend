import { Controller, HttpStatus, Post, Body, Res } from '@nestjs/common';
import { ProposalService } from '../proposal/proposal.service';
import { RelayerService } from '../relayer/relayer.service';

@Controller('relayer')
export class RelayerController {
  constructor(
    private readonly proposalService: ProposalService,
    private readonly relayerService: RelayerService,
  ) {}

  @Post('/winner')
  async getWinner() {
    const data = await this.relayerService.getWinner(
      '0x802a4b96b69b3c612eef6ca7b4408f55c78ac67f0064ea93b5a70192591926fb',
      'zunnoon.eth',
    );
    return true;
  }
}
