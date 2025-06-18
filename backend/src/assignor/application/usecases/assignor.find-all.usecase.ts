import { Injectable } from '@nestjs/common'
import { AssignorRepository } from '@/assignor/domain/assignor.repository'
import { AssignorEntity } from '@/assignor/domain/assignor.entity'

@Injectable()
export class FindAllAssignorsUseCase {
  constructor(protected readonly assignorRepository: AssignorRepository) {}

  async execute(): Promise<AssignorEntity[]> {
    return this.assignorRepository.findAll()
  }
}
