import { UserEntity } from './user.entity'

export abstract class UserRepository {
  abstract create(user: UserEntity): Promise<UserEntity>
  abstract findById(id: string): Promise<UserEntity | null>
  abstract update(user: UserEntity): Promise<UserEntity>
  abstract delete(id: string): Promise<void>
  abstract findByLogin(login: string): Promise<UserEntity | null>
}
