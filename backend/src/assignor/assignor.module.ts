import { Module } from '@nestjs/common'
import { PrismaService } from '@/shared/infrastructure/database/prisma.service'
import { AssignorRepository } from './domain/assignor.repository'
import { AssignorPrismaRepository } from './infrastructure/assignor-prisma.repository'

@Module({
  imports: [],
  controllers: [],
  providers: [
    PrismaService,
    {
      provide: AssignorRepository,
      useClass: AssignorPrismaRepository,
    },
  ],
  exports: [AssignorRepository],
})
export class AssignorModule {}
