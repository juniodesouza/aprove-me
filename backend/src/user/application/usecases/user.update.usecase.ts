import { UserEntity } from '@/user/domain/user.entity'
import { UserRepository } from '@/user/domain/user.repository'
import { Injectable, NotFoundException } from '@nestjs/common'
import { UpdateUserDto } from '../dtos/user.update.dto'

@Injectable()
export class UpdateUserUseCase {
  constructor(protected readonly userRepository: UserRepository) {}

  async execute(input: { id: string; data: UpdateUserDto }): Promise<UserEntity> {
    const user = await this.userRepository.findById(input.id)

    if (!user) {
      throw new NotFoundException()
    }

    const updatedUser = await this.userRepository.update(
      new UserEntity({ ...user.props, ...input.data })
    )

    return updatedUser
  }
}
