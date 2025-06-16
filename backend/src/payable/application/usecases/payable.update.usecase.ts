import { PayableEntity, PayableProps } from '@/payable/domain/payable.entity'
import { PayableRepository } from '@/payable/domain/payable.repository'
import { Injectable, NotFoundException } from '@nestjs/common'
import { UpdatePayableDto } from '../dtos/payable.update.dto'

@Injectable()
export class UpdatePayableUseCase {
  constructor(protected readonly payableRepository: PayableRepository) {}

  async execute(input: {
    id: string
    data: UpdatePayableDto
  }): Promise<PayableEntity> {
    const payable = await this.payableRepository.findById(input.id)

    if (!payable) {
      throw new NotFoundException()
    }

    const updatedPayable = await this.payableRepository.update(
      new PayableEntity({
        ...payable.props,
        ...input.data,
      }),
    )

    return updatedPayable
  }
}
