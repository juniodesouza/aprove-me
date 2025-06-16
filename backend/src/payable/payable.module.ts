import { Module } from '@nestjs/common'
import { PayableController } from './infrastructure/payable.controller'
import { PrismaService } from '@/shared/infrastructure/database/prisma.service'
import { CreatePayableUseCase } from './application/usecases/payable.create.usecase'
import { PayableRepository } from './domain/payable.repository'
import { PayablePrismaRepository } from './infrastructure/payable-prisma.repository'
import { AssignorModule } from '@/assignor/assignor.module'

@Module({
  imports: [AssignorModule],
  controllers: [PayableController],
  providers: [
    PrismaService,
    {
      provide: PayableRepository,
      useClass: PayablePrismaRepository,
    },
    CreatePayableUseCase,
  ],
  exports: [],
})
export class PayabledModule {}
