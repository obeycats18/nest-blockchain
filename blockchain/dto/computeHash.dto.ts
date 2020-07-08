import { IndicatorInterface } from '../interfaces/indicators.interface';

export class ComputeHashDto {
  index: string;
  prevBlockHash: string;
  timestamp: number;
  data: IndicatorInterface | string;
  nonce: number;
}
