import { Controller, HttpStatus, Post, Body, Res } from '@nestjs/common';
import { WebhookService } from './webhook.service';
import { ProposalService } from '../proposal/proposal.service';

@Controller('webhook')
export class WebhookController {
  constructor(
    private readonly webhookService: WebhookService,
    private readonly proposalService: ProposalService,
  ) {}

  @Post('/snapshot')
  async snapshotHookMessage(@Body() body, @Res() res) {
    console.info('incoming snapshot webhook');
    // const data = await this.proposalService.analyze(body);
    return res.status(200);
  }
}
