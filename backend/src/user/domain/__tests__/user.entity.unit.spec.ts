import { UserEntity, UserProps } from '../user.entity'
import { UserDataBuilder } from './user.data-builder'

describe('UserEntity unit tests', () => {
  let props: UserProps
  let sut: UserEntity

  beforeEach(() => {
    props = UserDataBuilder()
    sut = new UserEntity(props)
  })

  it('should be defined', () => {
    expect(sut).toBeDefined()
  })

  it('should have the correct properties', () => {
    expect(sut.props).toStrictEqual(props)
  })
})
