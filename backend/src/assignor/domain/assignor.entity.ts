import { v4 as uuidv4 } from 'uuid'

export type AssignorProps = {
  id?: string
  createdAt?: Date
  updatedAt?: Date
  document: string
  email: string
  phone: string
  name: string
}

export class AssignorEntity {
  props: AssignorProps

  constructor(props: AssignorProps) {
    props.id = props.id || uuidv4()
    props.createdAt = props.createdAt || new Date()
    props.updatedAt = props.updatedAt || new Date()

    this.props = props
  }
}
