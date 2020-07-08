import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ChainService } from './chain.service';
import { IndicatorInterface } from './interfaces/indicators.interface';

@Injectable()
export class BlockchainService {

  constructor(private readonly _chainService: ChainService) {}

  public newTransaction(data: IndicatorInterface) {
    try{
      const isChainValid = this._chainService.validateChain()
      return isChainValid && this._chainService.addBlock(data)
    }catch (e) {
      throw new InternalServerErrorException(e)
    }

  }

}
