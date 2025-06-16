import { ConflictException, Injectable } from '@nestjs/common'
import { UserRepository } from '@/user/domain/user.repository'
import { UserEntity } from '@/user/domain/user.entity'
import { CreateUserDto } from '../dtos/user.create.dto'

@Injectable()
export class CreateUserUseCase {
  constructor(protected readonly userRepository: UserRepository) {}

  async execute(data: CreateUserDto): Promise<UserEntity> {
    const user = await this.userRepository.findByLogin(data.login)

    if (user) {
      throw new ConflictException(`User login already exists`)
    }

    return await this.userRepository.create(new UserEntity({ ...data }))
  }
}
