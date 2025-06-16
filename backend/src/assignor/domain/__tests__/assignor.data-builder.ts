import { faker } from '@faker-js/faker/.'
import { AssignorProps } from '../assignor.entity'

export function AssignorDataBuilder(
  overrides?: Partial<AssignorProps>,
): AssignorProps {
  return {
    id: faker.string.uuid(),
    createdAt: new Date(),
    updatedAt: new Date(),
    document: faker.string.numeric(11),
    email: faker.internet.email(),
    phone: faker.phone.number(),
    name: faker.person.fullName(),
    ...overrides,
  }
}
