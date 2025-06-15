import { CreateAssignorDto } from '@/assignor/application/dtos/create.dto'
import { ApiProperty } from '@nestjs/swagger'
import { Expose, Type } from 'class-transformer'
import {
  IsDate,
  IsEmail,
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
  @IsNumber()
  @IsNotEmpty()
  value: number

  @ApiProperty()
  @Expose()
  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  saleDate: Date

  @ApiProperty()
  @Expose()
  @ValidateNested()
  @Type(() => CreateAssignorDto)
  @IsObject()
  @IsNotEmpty()
  assignor: CreateAssignorDto
}
