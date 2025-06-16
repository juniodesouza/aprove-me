import { PayableEntity, PayableProps } from '../payable.entity'
import { PayableDataBuilder } from './payable.data-builder'

describe('PayableEntity unit tests', () => {
  let props: PayableProps
  let sut: PayableEntity

  beforeEach(() => {
    props = PayableDataBuilder()
    sut = new PayableEntity(props)
  })

  it('should be defined', () => {
    expect(sut).toBeDefined()
  })

  it('should have the correct properties', () => {
    expect(sut.props).toStrictEqual(props)
  })
})
