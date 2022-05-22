import { Module } from '@nestjs/common';
import { WebhookService } from './webhook.service';
import { WebhookController } from './webhook.controller';
import { ProposalModule } from '../proposal/proposal.module';
import { RelayerModule } from '../relayer/relayer.module';
import { SubdaoModule } from '../subdao/subdao.module';

@Module({
  imports: [ProposalModule, RelayerModule, SubdaoModule],
  providers: [WebhookService],
  controllers: [WebhookController],
})
export class WebhookModule {}
