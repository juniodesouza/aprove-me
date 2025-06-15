import { Module } from '@nestjs/common'
import { PayableController } from './infrastructure/payable.controller'

@Module({
  imports: [],
  controllers: [PayableController],
  providers: [],
  exports: [],
})
export class PayabledModule {}
