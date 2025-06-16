import { Injectable, NotFoundException } from '@nestjs/common'
import { PayableRepository } from '@/payable/domain/payable.repository'
import { PayableEntity } from '@/payable/domain/payable.entity'

@Injectable()
export class FindPayableByIdUseCase {
  constructor(protected readonly payableRepository: PayableRepository) {}

  async execute(id: string): Promise<PayableEntity> {
    const payable = await this.payableRepository.findById(id)

    if (!payable) {
      throw new NotFoundException()
    }

    return payable
  }
}
