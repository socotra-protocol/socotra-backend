import { Module } from '@nestjs/common';
import { ProposalService } from './proposal.service';
import { SubdaoModule } from '../subdao/subdao.module';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { ProposalController } from './proposal.controller';
import { Proposal } from './entities/proposal.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Proposal]),
    SubdaoModule,
    ConfigModule,
    HttpModule,
  ],
  providers: [ProposalService],
  controllers: [ProposalController],
  exports: [ProposalService],
})
export class ProposalModule {}
