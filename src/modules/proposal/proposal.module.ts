import { Module } from '@nestjs/common';
import { ProposalService } from './proposal.service';
import { SubdaoModule } from '../subdao/subdao.module';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { ProposalController } from './proposal.controller';

@Module({
  imports: [SubdaoModule, ConfigModule, HttpModule],
  providers: [ProposalService],
  controllers: [ProposalController],
})
export class ProposalModule {}
