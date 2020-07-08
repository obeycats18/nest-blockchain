import { IndicatorInterface } from './indicators.interface';

export interface BlockInterface {
  index: string;
  timestamp: number;
  prevBlockHash: string;
  data: IndicatorInterface | string;
  hash?: string;
  nonce: number;
}