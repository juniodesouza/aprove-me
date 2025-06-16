import { AssignorEntity } from '@/assignor/domain/assignor.entity'
import { Injectable, NotFoundException } from '@nestjs/common'
import { UpdateAssignorDto } from '../dtos/assignor.update.dto'
import { AssignorRepository } from '@/assignor/domain/assignor.repository'

@Injectable()
export class UpdateAssignorUseCase {
  constructor(protected readonly assignorRepository: AssignorRepository) {}

  async execute(input: {
    id: string
    data: UpdateAssignorDto
  }): Promise<AssignorEntity> {
    const assignor = await this.assignorRepository.findById(input.id)

    if (!assignor) {
      throw new NotFoundException()
    }

    const updatedAssignor = await this.assignorRepository.update(
      new AssignorEntity({
        ...assignor.props,
        ...input.data,
      }),
    )

    return updatedAssignor
  }
}
