import { plainToInstance } from 'class-transformer'
import { PayableEntity } from '../domain/payable.entity'
import { PayableResponseDto } from './payable.response.dto'

export class PayablePresenter {
  static toHttp(payableEntity: PayableEntity): PayableResponseDto {
    return plainToInstance(
      PayableResponseDto,
      {
        ...payableEntity.props,
        value: payableEntity.props.value / 100,
      },
      {
        excludeExtraneousValues: true,
      },
    )
  }
}
