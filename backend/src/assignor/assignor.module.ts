import { Module } from '@nestjs/common'
import { PrismaService } from '@/shared/infrastructure/database/prisma.service'
import { AssignorRepository } from './domain/assignor.repository'
import { AssignorPrismaRepository } from './infrastructure/assignor-prisma.repository'
import { CreateAssignorUseCase } from './application/usecases/assignor.create.usecase'
import { DeleteAssignorUseCase } from './application/usecases/assignor.delete.usecase'
import { FindAssignorByIdUseCase } from './application/usecases/assignor.find-by-id.usecase'
import { UpdateAssignorUseCase } from './application/usecases/assignor.update.usecase'
import { FindAllAssignorsUseCase } from './application/usecases/assignor.find-all.usecase'
import { AssignorController } from './infrastructure/assignor.controller'

@Module({
  imports: [],
  controllers: [AssignorController],
  providers: [
    PrismaService,
    {
      provide: AssignorRepository,
      useClass: AssignorPrismaRepository,
    },
    CreateAssignorUseCase,
    DeleteAssignorUseCase,
    FindAllAssignorsUseCase,
    FindAssignorByIdUseCase,
    UpdateAssignorUseCase,
  ],
  exports: [AssignorRepository],
})
export class AssignorModule {}
