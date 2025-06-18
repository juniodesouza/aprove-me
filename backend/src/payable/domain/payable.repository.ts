import { PayableEntity } from './payable.entity'

export abstract class PayableRepository {
  abstract create(payable: PayableEntity): Promise<PayableEntity>
  abstract findById(id: string): Promise<PayableEntity | null>
  abstract update(payable: PayableEntity): Promise<PayableEntity>
  abstract delete(id: string): Promise<void>
  abstract findAll(): Promise<PayableEntity[]>
}
