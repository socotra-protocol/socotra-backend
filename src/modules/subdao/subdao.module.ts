import { Module } from '@nestjs/common';
import { SubdaoService } from './subdao.service';
import { SubdaoController } from './subdao.controller';

@Module({
  providers: [SubdaoService],
  controllers: [SubdaoController]
})
export class SubdaoModule {}
