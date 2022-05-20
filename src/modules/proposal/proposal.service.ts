import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, ObjectID, Repository } from 'typeorm';

@Injectable()
export class ProposalService {
  async analyze(dto) {}
}
