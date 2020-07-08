import { Injectable, InternalServerErrorException } from '@nestjs/common';

import * as crypto from 'crypto'
import { BlockInterface } from './interfaces/block.interface';
import { ComputeHashDto } from './dto/computeHash.dto';
import { CreateBlockDto } from './dto/createBlock.dto';

import {trampoline} from '../utils/trampoline';

@Injectable()
export class BlockService {

  private _block: BlockInterface

  public createBlock( block: CreateBlockDto ) {
    this._block = block;
    return this._block;
  }

  public computeHash( block: ComputeHashDto ) {
    return crypto.createHash('sha256').update(`${JSON.stringify(block)}`).digest('hex');
  }

  public updateHash(block: BlockInterface): BlockInterface {
    return {...block, hash: this.computeHash(block)}
  }

  public nextNonce(block: BlockInterface) {
    return this.updateHash({...block, nonce: block.nonce++})
  }

  public creteGenesisBlock(): BlockInterface {
    const initialBlock = {
      index: '0',
      timestamp: +new Date(),
      data: "Genesis Block",
      prevBlockHash: '0',
      nonce: 1
    }
    return this.createBlock({ ...initialBlock, hash: this.computeHash(initialBlock) })
  }

  public checkDifficulty(difficulty, hash) {
    return hash.substr(0, difficulty) === '0'.repeat(difficulty)
  }


  public mineBlock(difficulty: number, block: BlockInterface): BlockInterface {
    try{
      const mine = block => {
        return this.checkDifficulty(difficulty, block.hash) ? block : () => mine(this.nextNonce(block))
      }
      return trampoline(mine(this.nextNonce(block)))
    }catch (e) {
      throw new InternalServerErrorException()
    }
  }

}


