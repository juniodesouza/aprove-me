import { Injectable } from '@nestjs/common'
import { PayableRepository } from '@/payable/domain/payable.repository'
import { PayableEntity } from '@/payable/domain/payable.entity'
import { CreatePayableDto } from '../dtos/create.dto'
import { AssignorRepository } from '@/assignor/domain/assignor.repository'
import { AssignorEntity } from '@/assignor/domain/assignor.entity'

@Injectable()
export class CreatePayableUseCase {
  constructor(
    protected readonly payableRepository: PayableRepository,
    protected readonly assignorRepository: AssignorRepository,
  ) {}

  async execute(data: CreatePayableDto): Promise<PayableEntity> {
    let assignor = await this.assignorRepository.findByDocument(
      data.assignor.document,
    )

    if (!assignor) {
      assignor = await this.assignorRepository.create(
        new AssignorEntity(data.assignor),
      )
    }

    const payable = new PayableEntity({
      value: data.value,
      emissionDate: data.emissionDate,
      assignorId: assignor.props.id,
    })

    return await this.payableRepository.create(payable)
  }
}
