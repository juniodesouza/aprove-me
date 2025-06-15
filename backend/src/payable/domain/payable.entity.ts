import { v4 as uuidv4 } from 'uuid'

export type PayableProps = {
  id?: string
  createdAt?: Date
  updatedAt?: Date
  value: string
  emissionDate: Date
  assignorId: string
}

export class PayableEntity {
  props: PayableProps

  constructor(props: PayableProps) {
    props.id = props.id || uuidv4()
    props.createdAt = props.createdAt || new Date()
    props.updatedAt = props.updatedAt || new Date()

    this.props = props
  }
}
