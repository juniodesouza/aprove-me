import { v4 as uuidv4 } from 'uuid'

export type UserProps = {
  id?: string
  createdAt?: Date
  updatedAt?: Date
  login: string
  password: string
}

export class UserEntity {
  props: UserProps

  constructor(props: UserProps) {
    props.id = props.id || uuidv4()
    props.createdAt = props.createdAt || new Date()
    props.updatedAt = props.updatedAt || new Date()

    this.props = props
  }
}
