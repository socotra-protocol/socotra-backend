import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, ObjectID, Repository } from 'typeorm';
import { SubdaoService } from '../subdao/subdao.service';

@Injectable()
export class ProposalService {
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
    private readonly subdaoService: SubdaoService,
  ) {}
  // check if domain is in db, if proposal ended -> call relayer
  async analyze(dto) {}
}
