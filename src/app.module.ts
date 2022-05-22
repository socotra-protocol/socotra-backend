import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ProposalModule } from './modules/proposal/proposal.module';
import { ProposalService } from './modules/proposal/proposal.service';
import { WebhookModule } from './modules/webhook/webhook.module';
import { WebhookService } from './modules/webhook/webhook.service';
import { SubdaoModule } from './modules/subdao/subdao.module';
import { PayoutModule } from './modules/payout/payout.module';
import { MemberModule } from './modules/member/member.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dbConfig } from './configs/database.config';
import { graphConfig } from './configs/graph.config';
import { SubgraphModule } from './modules/subgraph/subgraph.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: false,
      load: [dbConfig, graphConfig],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('database.host'),
        port: configService.get<number>('database.port'),
        username: configService.get('database.username'),
        password: configService.get('database.password'),
        database: configService.get('database.name'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        timezone: 'utc',
        synchronize: configService.get<boolean>('database.synchronize'),
        bigNumberStrings: false,
        logging: false,
        extra: {
          charset: 'utf8mb4_unicode_ci',
        },
      }),
    }),
    ProposalModule,
    SubgraphModule,
    PayoutModule,
    MemberModule,
    WebhookModule,
    SubdaoModule,
  ],
  controllers: [],

  providers: [],
})
export class AppModule {}
