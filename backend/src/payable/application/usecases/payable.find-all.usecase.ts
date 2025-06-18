import { Injectable } from '@nestjs/common'
import { PayableRepository } from '@/payable/domain/payable.repository'
import { PayableEntity } from '@/payable/domain/payable.entity'

@Injectable()
export class FindAllPayablesUseCase {
  constructor(protected readonly payableRepository: PayableRepository) {}

  async execute(): Promise<PayableEntity[]> {
    return this.payableRepository.findAll()
  }
}
