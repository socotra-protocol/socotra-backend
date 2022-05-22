import { Module } from '@nestjs/common';
import { RelayerService } from './relayer.service';
import { ProposalModule } from '../proposal/proposal.module';
import { RelayerController } from './relayer.controller';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [ConfigModule, HttpModule, ProposalModule],
  providers: [RelayerService],
  controllers: [RelayerController],
  exports: [RelayerService],
})
export class RelayerModule {}
