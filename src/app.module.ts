import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ProposalModule } from './modules/proposal/proposal.module';
import { ProposalService } from './modules/proposal/proposal.service';
import { WebhookModule } from './modules/webhook/webhook.module';
import { WebhookService } from './modules/webhook/webhook.service';
import { SubdaoModule } from './modules/subdao/subdao.module';

@Module({
  imports: [ProposalModule, WebhookModule, SubdaoModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
