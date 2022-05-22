import { Controller, HttpStatus, Post, Body, Res } from '@nestjs/common';
import { WebhookService } from './webhook.service';
import { ProposalService } from '../proposal/proposal.service';
import { RelayerService } from '../relayer/relayer.service';

@Controller('webhook')
export class WebhookController {
  constructor(
    private readonly webhookService: WebhookService,
    private readonly proposalService: ProposalService,
    private readonly relayerService: RelayerService,
  ) {}

  @Post('/snapshot')
  async snapshotHookMessage(@Body() body, @Res() res) {
    console.info('incoming snapshot webhook');
    const data = await this.webhookService.analyze(body);
    return res.status(200);
  }
}
