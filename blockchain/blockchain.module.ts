import { Module } from '@nestjs/common';
import { BlockchainService } from './blockchain.service';
import { BlockService } from './block.service';
import { ChainService } from './chain.service';
import { BlockchainController } from './blockchain.controller';

@Module({
  providers: [BlockchainService, BlockService, ChainService],
  controllers: [BlockchainController],
  exports: [BlockService, ChainService]
})
export class BlockchainModule {}
