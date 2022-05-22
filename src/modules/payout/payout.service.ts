import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { Payout } from './entities/payout.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {
  FindManyOptions,
  FindOneOptions,
  getConnection,
  Repository,
} from 'typeorm';

@Injectable()
export class PayoutService {
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
    @InjectRepository(Payout)
    private readonly payoutRepository: Repository<Payout>,
  ) {}

  async findOne(options?: FindOneOptions<Payout>) {
    return this.payoutRepository.findOne(options);
  }

  async findAll(options?: FindManyOptions<Payout>) {
    return this.payoutRepository.find(options);
  }

  async upsert(payout: Payout) {
    return await getConnection()
      .createQueryBuilder()
      .insert()
      .into(Payout)
      .values(payout)
      .orUpdate(['state'], ['payoutId', 'memberAddress', 'subdaoId']) //If proposal exists we update its info.
      .execute();
  }
}
