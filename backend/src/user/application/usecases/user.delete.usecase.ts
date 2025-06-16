import { UserRepository } from '@/user/domain/user.repository'
import { Injectable, NotFoundException } from '@nestjs/common'

@Injectable()
export class DeleteUserUseCase {
  constructor(protected readonly userRepository: UserRepository) {}

  async execute(id: string): Promise<void> {
    const user = await this.userRepository.findById(id)

    if (!user) {
      throw new NotFoundException()
    }

    return this.userRepository.delete(id)
  }
}
