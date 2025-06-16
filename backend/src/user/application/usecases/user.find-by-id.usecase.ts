import { UserEntity } from '@/user/domain/user.entity'
import { UserRepository } from '@/user/domain/user.repository'
import { Injectable, NotFoundException } from '@nestjs/common'

@Injectable()
export class FindUserByIdUseCase {
  constructor(protected readonly userRepository: UserRepository) {}

  async execute(id: string): Promise<UserEntity> {
    const user = await this.userRepository.findById(id)

    if (!user) {
      throw new NotFoundException()
    }

    return user
  }
}
