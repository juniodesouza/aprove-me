import { ApiProperty } from '@nestjs/swagger'
import { Expose, Transform } from 'class-transformer'

export class PayableResponseDto {
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
  value: number

  @Expose()
  @ApiProperty()
  emissionDate: Date

  @Expose()
  @ApiProperty({
    format: 'uuid',
  })
  assignorId: string
}
