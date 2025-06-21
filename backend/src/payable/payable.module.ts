import { Module } from '@nestjs/common'
import { PayableController } from './infrastructure/payable.controller'
import { CreatePayableUseCase } from './application/usecases/payable.create.usecase'
import { PayableRepository } from './domain/payable.repository'
import { PayablePrismaRepository } from './infrastructure/payable-prisma.repository'
import { AssignorModule } from '@/assignor/assignor.module'
import { FindPayableByIdUseCase } from './application/usecases/payable.find-by-id.usecase'
import { UpdatePayableUseCase } from './application/usecases/payable.update.usecase'
import { DeletePayableUseCase } from './application/usecases/payable.delete.usecase'
import { FindAllPayablesUseCase } from './application/usecases/payable.find-all.usecase'

@Module({
  imports: [AssignorModule],
  controllers: [PayableController],
  providers: [
    {
      provide: PayableRepository,
      useClass: PayablePrismaRepository,
    },
    CreatePayableUseCase,
    FindPayableByIdUseCase,
    FindAllPayablesUseCase,
    UpdatePayableUseCase,
    DeletePayableUseCase,
  ],
  exports: [],
})
export class PayabledModule {}
