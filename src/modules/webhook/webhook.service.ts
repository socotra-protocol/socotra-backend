import { Injectable } from '@nestjs/common';
import { SubdaoService } from '../subdao/subdao.service';
import { ProposalService } from '../proposal/proposal.service';
import { RelayerService } from '../relayer/relayer.service';

@Injectable()
export class WebhookService {
  constructor(
    private readonly subdaoService: SubdaoService,
    private readonly proposalService: ProposalService,
    private readonly relayerService: RelayerService,
  ) {}

  async analyze(dto) {
    const domain = dto.space;
    const name = dto.space.split('.')[0];
    const event = dto.event.split('/')[1];
    const proposalId: string = dto.id.split('/')[1];

    // check domain
    const queriedDomain = await this.subdaoService.findOne({
      where: { domain: domain },
    });

    if (queriedDomain && event == 'end') {
      const proposal = await this.proposalService.findOne({
        where: { subProposalId: proposalId },
      });
      const result = await this.relayerService.relayVote(
        proposal.mainProposalId,
        proposal.subProposalId,
        domain,
        proposal.managerAddress,
        proposal.target,
        proposal.type,
      );
      console.log(result);
    }
  }
}
