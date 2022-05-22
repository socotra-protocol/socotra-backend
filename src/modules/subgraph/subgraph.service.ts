import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { InjectRepository } from '@nestjs/typeorm';
import {
  FindManyOptions,
  FindOneOptions,
  getConnection,
  Repository,
} from 'typeorm';
import { SubdaoService } from '../subdao/subdao.service';
import { exec } from 'child_process';
import * as fs from 'fs';
import * as yaml from 'js-yaml';
import * as path from 'path';
import { createFile } from 'src/common/storage.helper';

export class SubgraphService {
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
    private readonly subdaoService: SubdaoService,
  ) {}

  async readYaml() {
    // console.log('path: ', path.resolve(__dirname, '../../../../'));
    const doc = JSON.stringify(
      yaml.load(
        await fs.readFileSync('../socotra-subgraph/subgraph.yaml', 'utf8'),
      ),
    );
    console.log(doc);
  }

  async writeYaml() {
    const data = {
      specVersion: '0.0.2',
      schema: { file: './schema.graphql' },
      dataSources: [
        {
          kind: 'ethereum',
          name: 'SocotraFactory',
          network: 'rinkeby',
          source: {
            address: 'test',
            abi: 'SocotraFactory',
          },
          mapping: {
            kind: 'ethereum/events',
            apiVersion: '0.0.5',
            language: 'wasm/assemblyscript',
            entities: ['SplitBranch'],
            abis: [
              { name: 'SocotraFactory', file: './abis/SocotraFactory.json' },
            ],
            eventHandlers: [
              {
                event: 'SplitBranch(address,address,uint256,address,uint256)',
                handler: 'handleSplitBranch',
              },
            ],
            file: './src/factory.ts',
          },
        },
        {
          kind: 'ethereum',
          name: 'SocotraBranchManager',
          network: 'rinkeby',
          source: {
            address: '0x5c8b4e60c9ed75441f48e18586d3a8043921b05c',
            abi: 'SocotraBranchManager',
          },
          mapping: {
            kind: 'ethereum/events',
            apiVersion: '0.0.5',
            language: 'wasm/assemblyscript',
            entities: ['SplitBranch'],
            abis: [
              {
                name: 'SocotraBranchManager',
                file: './abis/SocotraBranchManager.json',
              },
            ],
            eventHandlers: [
              {
                event: 'ProxyRegistered(address)',
                handler: 'handleProxyRegistered',
              },
              {
                event: 'UpdateSnapshot(address)',
                handler: 'handleUpdateSnapshot',
              },
              {
                event: 'DelegateSpace(bytes32)',
                handler: 'handleDelegateSpace',
              },
              {
                event: 'RegisterMember(address,uint256,uint256)',
                handler: 'handleRegisterMember',
              },
              {
                event: 'ClaimToken(address,uint256)',
                handler: 'handleClaimToken',
              },
              {
                event: 'RequestPayout(uint256,uint256,address,address,bytes)',
                handler: 'handleRequestPayout',
              },
              {
                event: 'WithdrawPayout(uint256)',
                handler: 'handleWithdrawPayout',
              },
              { event: 'IssuePayout(uint256)', handler: 'handleIssuePayout' },
            ],
            file: './src/manager.ts',
          },
        },
      ],
    };

    const yamlStr = yaml.dump(data);

    await fs.writeFileSync(
      '../socotra-subgraph/subgraph.yaml',
      yamlStr,
      'utf8',
    );

    return true;
  }
}
