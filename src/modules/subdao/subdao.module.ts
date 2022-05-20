import { Module } from '@nestjs/common';
import { SubdaoService } from './subdao.service';
import { SubdaoController } from './subdao.controller';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [ConfigModule, HttpModule],
  providers: [SubdaoService],
  controllers: [SubdaoController],
})
export class SubdaoModule {}
