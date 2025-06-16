import { ConflictException, Injectable } from '@nestjs/common'
import { AssignorRepository } from '@/assignor/domain/assignor.repository'
import { AssignorEntity } from '@/assignor/domain/assignor.entity'
import { CreateAssignorDto } from '../dtos/assignor.create.dto'

@Injectable()
export class CreateAssignorUseCase {
  constructor(protected readonly assignorRepository: AssignorRepository) {}

  async execute(data: CreateAssignorDto): Promise<AssignorEntity> {
    let assignor = await this.assignorRepository.findByDocument(data.document)

    if (assignor) {
      throw new ConflictException(`Assignor document already exists`)
    }

    return await this.assignorRepository.create(
      new AssignorEntity({
        ...data,
      }),
    )
  }
}
