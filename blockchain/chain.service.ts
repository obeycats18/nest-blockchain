import { Injectable } from '@nestjs/common';
import { BlockService } from './block.service';
import { BlockInterface } from './interfaces/block.interface';
import { IndicatorInterface } from './interfaces/indicators.interface';

import * as crypto from 'crypto'

@Injectable()
export class ChainService {

  private _chain: BlockInterface[] = [this._blockService.creteGenesisBlock()]

  constructor(private readonly _blockService: BlockService) {}

  public addBlock(data: IndicatorInterface) {
    try {
      const _chainLength = this._chain.length;
      const index = crypto.createHash('sha256').update(`${Math.floor(Math.random() * 1000)}`).digest('hex')
      const {hash: prevBlockHash} = this._chain[_chainLength - 1];
      const block = this._blockService.createBlock({index, data, prevBlockHash, timestamp: +new Date(), nonce: 0})
      const newBlock = this._blockService.mineBlock(4, block)
      this._chain.push(newBlock)
      return this._chain
    }catch (e) {
      console.error(e)
    }
  }

  public validateChain(): boolean {
    const tce = (index: number) => {

      if(index === 0) return true

      const currBlock = this._chain[index]
      const prevBlock = this._chain[index - 1]
      const isPrevHashValid = prevBlock.hash === currBlock.prevBlockHash

      if(!isPrevHashValid) return false
      else return tce(index - 1)
    }

    return tce(this._chain.length - 1)
  }



}
