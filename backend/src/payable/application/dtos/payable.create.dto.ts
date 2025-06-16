import { ApiProperty } from '@nestjs/swagger'
import { Expose, Transform, Type } from 'class-transformer'
import { IsDate, IsNotEmpty, IsNumber, IsUUID } from 'class-validator'

export class CreatePayableDto {
  @ApiProperty({
    example: 1250.35,
  })
  @Expose()
  @Transform(({ value }) => value * 100)
  @IsNumber()
  @IsNotEmpty()
  value: number

  @ApiProperty()
  @Expose()
  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  emissionDate: Date

  @ApiProperty({
    format: 'uuid',
    description: 'Unique identifier for the assignor',
  })
  @Expose()
  @IsUUID(4)
  @IsNotEmpty()
  assignorId: string
}
