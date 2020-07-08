import { IndicatorInterface } from '../interfaces/indicators.interface';

export class CreateBlockDto {
  index: string;
  prevBlockHash: string;
  timestamp: number;
  data: IndicatorInterface | string;
  nonce: number;
  hash?: string;
}
