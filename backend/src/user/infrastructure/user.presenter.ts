import { plainToInstance } from 'class-transformer'
import { UserResponseDto } from './user.response.dto'
import { UserEntity } from '../domain/user.entity'

export class UserPresenter {
  static toHttp(userEntity: UserEntity): UserResponseDto {
    return plainToInstance(UserResponseDto, userEntity.props, {
      excludeExtraneousValues: true,
    })
  }
}
