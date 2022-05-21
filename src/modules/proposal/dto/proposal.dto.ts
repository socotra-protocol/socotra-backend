import {
  IsNumber,
  IsString,
  MinLength,
  IsArray,
  IsObject,
  IsOptional,
} from 'class-validator';

interface StrategyParams {
  symbol: string;
  address: string;
  decimals: number;
}

export class ProposalValidateDto {
  @IsString()
  url: string;

  @IsString()
  subdaoId: string;
}

export class ProposalStrategyDto {
  @IsString()
  name: string;

  @IsObject()
  params: StrategyParams;
}

export class ProposalDataDto {
  @IsArray()
  strategies: [ProposalStrategyDto];
}
