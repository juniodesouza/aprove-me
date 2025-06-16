import { AssignorRepository } from '@/assignor/domain/assignor.repository'
import { Injectable, NotFoundException } from '@nestjs/common'

@Injectable()
export class DeleteAssignorUseCase {
  constructor(protected readonly assignorRepository: AssignorRepository) {}

  async execute(id: string): Promise<void> {
    const assignor = await this.assignorRepository.findById(id)

    if (!assignor) {
      throw new NotFoundException()
    }

    return this.assignorRepository.delete(id)
  }
}
