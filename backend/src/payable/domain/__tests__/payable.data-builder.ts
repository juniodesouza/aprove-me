import { faker } from '@faker-js/faker/.'
import { PayableProps } from '../payable.entity'

export function PayableDataBuilder(overrides?: Partial<PayableProps>): PayableProps {
  return {
    id: faker.string.uuid(),
    createdAt: new Date(),
    updatedAt: new Date(),
    value: faker.number.int({ min: 100, max: 10000 }),
    emissionDate: faker.date.recent(),
    assignorId: faker.string.uuid(),
    ...overrides,
  }
}
