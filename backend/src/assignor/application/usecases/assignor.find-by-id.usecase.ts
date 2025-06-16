import { AssignorEntity } from '@/assignor/domain/assignor.entity'
import { AssignorRepository } from '@/assignor/domain/assignor.repository'
import { Injectable, NotFoundException } from '@nestjs/common'

@Injectable()
export class FindAssignorByIdUseCase {
  constructor(protected readonly assignorRepository: AssignorRepository) {}

  async execute(id: string): Promise<AssignorEntity> {
    const assignor = await this.assignorRepository.findById(id)

    if (!assignor) {
      throw new NotFoundException()
    }

    return assignor
  }
}
