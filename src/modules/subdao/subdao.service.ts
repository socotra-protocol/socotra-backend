import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { ProposalDataDto } from './dto/proposal.dto';
import { Subdao } from './entities/subdao.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {
  FindManyOptions,
  FindOneOptions,
  getConnection,
  Repository,
} from 'typeorm';

@Injectable()
export class SubdaoService {
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
    @InjectRepository(Subdao)
    private readonly subdaoRepository: Repository<Subdao>,
  ) {}

  async findOne(options?: FindOneOptions<Subdao>) {
    return this.subdaoRepository.findOne(options);
  }

  async findAll(options?: FindManyOptions<Subdao>) {
    return this.subdaoRepository.find(options);
  }

  async upsert(subdao: Subdao) {
    return await getConnection()
      .createQueryBuilder()
      .insert()
      .into(Subdao)
      .values(subdao)
      .orUpdate(['domain', 'voteProxyAddress'], ['managerAddress']) //If channel exists we update its info.
      .execute();
  }
}
