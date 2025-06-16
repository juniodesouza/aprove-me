import { Injectable, NotFoundException } from '@nestjs/common'
import { PayableRepository } from '@/payable/domain/payable.repository'
import { PayableEntity } from '@/payable/domain/payable.entity'
import { CreatePayableDto } from '../dtos/payable.create.dto'
import { AssignorRepository } from '@/assignor/domain/assignor.repository'

@Injectable()
export class CreatePayableUseCase {
  constructor(
    protected readonly payableRepository: PayableRepository,
    protected readonly assignorRepository: AssignorRepository,
  ) {}

  async execute(data: CreatePayableDto): Promise<PayableEntity> {
    let assignor = await this.assignorRepository.findById(data.assignorId)

    if (!assignor) {
      throw new NotFoundException(
        `Assignor with id ${data.assignorId} not found`,
      )
    }

    return await this.payableRepository.create(
      new PayableEntity({
        ...data,
      }),
    )
  }
}
