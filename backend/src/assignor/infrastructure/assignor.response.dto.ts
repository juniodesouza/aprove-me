import { ApiProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'

export class AssignorResponseDto {
  @Expose()
  @ApiProperty({
    format: 'uuid',
  })
  id: string

  @Expose()
  @ApiProperty()
  createdAt: Date

  @Expose()
  @ApiProperty()
  updatedAt: Date

  @Expose()
  @ApiProperty()
  document: string

  @Expose()
  @ApiProperty()
  email: string

  @Expose()
  @ApiProperty()
  phone: string

  @Expose()
  @ApiProperty()
  name: string
}
