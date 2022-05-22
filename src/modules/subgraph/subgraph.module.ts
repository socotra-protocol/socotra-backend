import { Module } from '@nestjs/common';
import { SubgraphService } from './subgraph.service';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { SubdaoModule } from '../subdao/subdao.module';
import { SubgraphController } from './subgraph.controlller';

@Module({
  imports: [ConfigModule, HttpModule, SubdaoModule],
  controllers: [SubgraphController],
  providers: [SubgraphService],
  exports: [SubgraphService],
})
export class SubgraphModule {}
