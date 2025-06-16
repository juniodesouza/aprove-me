import { Module } from '@nestjs/common'
import { PrismaService } from '@/shared/infrastructure/database/prisma.service'
import { UserRepository } from './domain/user.repository'
import { UserPrismaRepository } from './infrastructure/user-prisma.repository'
import { CreateUserUseCase } from './application/usecases/user.create.usecase'
import { DeleteUserUseCase } from './application/usecases/user.delete.usecase'
import { FindUserByIdUseCase } from './application/usecases/user.find-by-id.usecase'
import { UpdateUserUseCase } from './application/usecases/user.update.usecase'
import { UserController } from './infrastructure/user.controller'

@Module({
  imports: [],
  controllers: [UserController],
  providers: [
    PrismaService,
    {
      provide: UserRepository,
      useClass: UserPrismaRepository,
    },
    CreateUserUseCase,
    DeleteUserUseCase,
    FindUserByIdUseCase,
    UpdateUserUseCase,
  ],
  exports: [UserRepository],
})
export class UserModule {}
