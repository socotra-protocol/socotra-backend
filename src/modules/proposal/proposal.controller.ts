import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ProposalValidateDto } from './dto/proposal.dto';
import { Proposal } from './entities/proposal.entity';
import { ProposalService } from './proposal.service';

@Controller('proposal')
export class ProposalController {
  constructor(private readonly proposalService: ProposalService) {}

  @Get(':managerAddr')
  async getProposalByAddress(
    @Param('managerAddr') managerAddr: string,
  ): Promise<any> {
    console.log('getProposalByAddress', managerAddr);
    const response = await this.proposalService.findOne({
      where: {
        managerAddress: managerAddr.toLocaleLowerCase(),
      },
    });
    return response;
  }

  @Post()
  async createProposal(@Body() body: Proposal): Promise<any> {
    const response = await this.proposalService.upsert(body);
    return response;
  }

  @Post('/validate')
  async validate(@Body() body: ProposalValidateDto): Promise<any> {
    const { url, subdaoId } = body;
    const response = await this.proposalService.validateMainProposal(
      url,
      subdaoId,
    );
    return response;
  }
}
