import { Module } from '@nestjs/common'
import { UserRepository } from './domain/user.repository'
import { UserPrismaRepository } from './infrastructure/user-prisma.repository'
import { CreateUserUseCase } from './application/usecases/user.create.usecase'
import { DeleteUserUseCase } from './application/usecases/user.delete.usecase'
import { FindUserByIdUseCase } from './application/usecases/user.find-by-id.usecase'
import { UpdateUserUseCase } from './application/usecases/user.update.usecase'
import { UserController } from './infrastructure/user.controller'
import { HashProvider } from '@/shared/application/providers/hash.provider'
import { BcryptHashAdapter } from '@/shared/infrastructure/adapters/bcrypt.adapter'

@Module({
  imports: [],
  controllers: [UserController],
  providers: [
    {
      provide: UserRepository,
      useClass: UserPrismaRepository,
    },
    {
      provide: HashProvider,
      useClass: BcryptHashAdapter,
    },
    CreateUserUseCase,
    DeleteUserUseCase,
    FindUserByIdUseCase,
    UpdateUserUseCase,
  ],
  exports: [UserRepository],
})
export class UserModule {}
