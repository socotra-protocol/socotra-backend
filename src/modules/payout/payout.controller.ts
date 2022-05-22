import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Payout } from './entities/payout.entity';
import { PayoutService } from './payout.service';

@Controller('payout')
export class PayoutController {
  constructor(private readonly payoutService: PayoutService) {}

  @Post()
  async payout(@Body() body: Payout): Promise<any> {
    const response = await this.payoutService.upsert(body);
    return response;
  }

  @Get()
  async getPayoutByAddressAndSubdao(
    @Param('subdaoId') subdaoId: string,
    @Param('memberAddr') memberAddr: string,
  ): Promise<any> {
    const response = await this.payoutService.findAll({
      where: {
        memberId: memberAddr,
        subdaoId: subdaoId,
      },
    });
    return response;
  }
}
