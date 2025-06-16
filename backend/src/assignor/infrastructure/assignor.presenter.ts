import { plainToInstance } from 'class-transformer'
import { AssignorResponseDto } from './assignor.response.dto'
import { AssignorEntity } from '../domain/assignor.entity'

export class AssignorPresenter {
  static toHttp(assignorEntity: AssignorEntity): AssignorResponseDto {
    return plainToInstance(AssignorResponseDto, assignorEntity.props, {
      excludeExtraneousValues: true,
    })
  }
}
