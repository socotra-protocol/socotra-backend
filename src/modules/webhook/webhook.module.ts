import { Module } from '@nestjs/common';
import { WebhookService } from './webhook.service';
import { WebhookController } from './webhook.controller';
import { ProposalModule } from '../proposal/proposal.module';

@Module({
  imports: [ProposalModule],
  providers: [WebhookService],
  controllers: [WebhookController],
})
export class WebhookModule {}
