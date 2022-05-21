import { Module } from '@nestjs/common';
import { SubdaoService } from './subdao.service';
import { SubdaoController } from './subdao.controller';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { Subdao } from './entities/subdao.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Subdao]), ConfigModule, HttpModule],
  providers: [SubdaoService],
  controllers: [SubdaoController],
  exports: [SubdaoService],
})
export class SubdaoModule {}
