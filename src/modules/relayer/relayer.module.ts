import { Module } from '@nestjs/common';
import { RelayerService } from './relayer.service';

import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [ConfigModule, HttpModule],
  providers: [RelayerService],
})
export class RelayerModule {}
