import { Body, Controller, Post } from '@nestjs/common';
import { BlockchainService } from './blockchain.service';
import { CreateIndicatorDto } from './dto/createIndicator.dto';
import { IndicatorValidator } from 'src/validation/indicator.validator';

@Controller('blockchain')
export class BlockchainController {

  constructor(private readonly _blockchainService: BlockchainService) {}

  @Post('/transaction/new')
  createChain(@Body(new IndicatorValidator()) indicator: CreateIndicatorDto){
    return this._blockchainService.newTransaction(indicator)
  }

}
