import { AssignorEntity, AssignorProps } from '../assignor.entity'
import { AssignorDataBuilder } from './assignor.data-builder'

describe('AssignorEntity unit tests', () => {
  let props: AssignorProps
  let sut: AssignorEntity

  beforeEach(() => {
    props = AssignorDataBuilder()
    sut = new AssignorEntity(props)
  })

  it('should be defined', () => {
    expect(sut).toBeDefined()
  })

  it('should have the correct properties', () => {
    expect(sut.props).toStrictEqual(props)
  })
})
