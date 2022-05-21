import { Module } from '@nestjs/common';
import { PayoutService } from './payout.service';
import { PayoutController } from './payout.controller';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { Payout } from './entities/payout.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Payout]), ConfigModule, HttpModule],
  providers: [PayoutService],
  controllers: [PayoutController],
})
export class PayoutModule {}
