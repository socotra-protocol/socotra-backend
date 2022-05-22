import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Subdao } from './entities/subdao.entity';
import { SubdaoService } from './subdao.service';

@Controller('subdao')
export class SubdaoController {
  constructor(private readonly subdaoService: SubdaoService) {}

  @Get(':managerAddr')
  async getSubdaoByAddress(
    @Param('managerAddr') managerAddr: string,
  ): Promise<any> {
    console.log('managerAddr', managerAddr);
    const response = await this.subdaoService.findOne({
      where: {
        managerAddress: managerAddr.toLocaleLowerCase(),
      },
    });
    return response;
  }

  @Post()
  async createSubdao(@Body() body: Subdao): Promise<any> {
    const response = await this.subdaoService.upsert(body);
    return response;
  }
}
