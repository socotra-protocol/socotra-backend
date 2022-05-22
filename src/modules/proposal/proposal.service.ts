import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { InjectRepository } from '@nestjs/typeorm';
import {
  FindManyOptions,
  FindOneOptions,
  getConnection,
  Repository,
} from 'typeorm';
import { SubdaoService } from '../subdao/subdao.service';
import { Proposal } from './entities/proposal.entity';
import { ProposalDataDto } from './dto/proposal.dto';

@Injectable()
export class ProposalService {
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
    @InjectRepository(Proposal)
    private readonly proposalRepository: Repository<Proposal>,
    private readonly subdaoService: SubdaoService,
  ) {}

  async upsert(proposal: Proposal) {
    return await getConnection()
      .createQueryBuilder()
      .insert()
      .into(Proposal)
      .values(proposal)
      .orUpdate(['state'], ['subProposalId', 'mainProposalId']) //If proposal exists we update its info.
      .execute();
  }

  async findOne(options?: FindOneOptions<Proposal>) {
    return this.proposalRepository.findOne(options);
  }
  async findAll(options?: FindManyOptions<Proposal>) {
    return this.proposalRepository.find(options);
  }

  // validate if subdao can use the given main proposal
  async validateMainProposal(url: string, subdaoId: string) {
    // https://snapshot.org/#/ens.eth/proposal/0x104eb11d42813fadc2b408856e8fa2c10e34dbb4a87abaa2f089ece124263f16
    const arr = url.split('/');
    const proposalId = arr[arr.length - 1];
    const query = `{\n  proposal(id: "${proposalId}") {\n strategies{name, params}\n }\n}\n`;

    const response = await firstValueFrom(
      this.httpService.post(
        this.configService.get<string>('graphUrl.snapshot'),
        {
          query,
          variables: null,
        },
      ),
    );

    const proposalData: ProposalDataDto = response.data.data.proposal;
    // check if data exist
    if (!proposalData) return false;

    // get main proposal's vote token address
    const strategyTokenAddresses = new Set();
    for (const strategy of proposalData.strategies) {
      if (strategy.params) {
        if (strategy.params.address) {
          strategyTokenAddresses.add(strategy.params.address.toLowerCase());
        }
      }
    }

    const subdao = await this.subdaoService.findOne({
      where: { id: subdaoId },
    });

    if (!strategyTokenAddresses.has(subdao.mainTokenAddress)) {
      return false;
    }

    return true;
  }
}
