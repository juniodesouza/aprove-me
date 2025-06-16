import { CreateAssignorDto } from '@/assignor/application/dtos/create.dto'
import { ApiProperty } from '@nestjs/swagger'
import { Expose, Transform, Type } from 'class-transformer'
import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsObject,
  ValidateNested,
} from 'class-validator'

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

  @ApiProperty()
  @Expose()
  @ValidateNested()
  @Type(() => CreateAssignorDto)
  @IsObject()
  @IsNotEmpty()
  assignor: CreateAssignorDto
}
