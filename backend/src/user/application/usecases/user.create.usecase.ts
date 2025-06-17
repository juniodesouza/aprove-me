import { ConflictException, Injectable } from '@nestjs/common'
import { UserRepository } from '@/user/domain/user.repository'
import { UserEntity } from '@/user/domain/user.entity'
import { CreateUserDto } from '../dtos/user.create.dto'
import { HashProvider } from '@/shared/application/providers/hash.provider'

@Injectable()
export class CreateUserUseCase {
  constructor(
    protected readonly userRepository: UserRepository,
    protected readonly hashProvider: HashProvider,
  ) {}

  async execute(data: CreateUserDto): Promise<UserEntity> {
    const user = await this.userRepository.findByLogin(data.login)

    if (user) {
      throw new ConflictException(`User login already exists`)
    }

    return await this.userRepository.create(
      new UserEntity({
        ...data,
        password: await this.hashProvider.hash(data.password),
      }),
    )
  }
}
