import { faker } from '@faker-js/faker/.'
import { UserProps } from '../user.entity'

export function UserDataBuilder(overrides?: Partial<UserProps>): UserProps {
  return {
    id: faker.string.uuid(),
    createdAt: new Date(),
    updatedAt: new Date(),
    login: faker.internet.email(),
    password: faker.internet.password(),
    ...overrides,
  }
}
