import { ApiProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'

export class UserResponseDto {
  @Expose()
  @ApiProperty({ format: 'uuid' })
  id: string

  @Expose()
  @ApiProperty()
  createdAt: Date

  @Expose()
  @ApiProperty()
  updatedAt: Date

  @Expose()
  @ApiProperty()
  login: string

  @Expose()
  @ApiProperty()
  password: string
}
