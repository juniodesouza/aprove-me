import { ApiProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'

export class AuthResponseDto {
  @Expose()
  @ApiProperty()
  accessToken: string
}
