import { PayableRepository } from '@/payable/domain/payable.repository'
import { Injectable, NotFoundException } from '@nestjs/common'

@Injectable()
export class DeletePayableUseCase {
  constructor(protected readonly payableRepository: PayableRepository) {}

  async execute(id: string): Promise<void> {
    const payable = await this.payableRepository.findById(id)

    if (!payable) {
      throw new NotFoundException()
    }

    return this.payableRepository.delete(id)
  }
}
