import { ApiProperty } from '@nestjs/swagger'
import { Expose, Type } from 'class-transformer'
import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsString,
  Length,
  Matches,
  ValidateNested,
} from 'class-validator'

class CreateAssignorDto {
  @ApiProperty({ example: '12345678901' })
  @Expose()
  @Length(11, 14)
  @Matches(/^\d{11}$|^\d{14}$/, {
    message: 'Document must be a valid CPF (11 digits) or CNPJ (14 digits)',
  })
  @IsString()
  @IsNotEmpty()
  document: string

  @ApiProperty({ example: 'assignor@test.com' })
  @Expose()
  @IsEmail()
  @Length(1, 140)
  @Matches(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, {
    message: 'Invalid email',
  })
  @IsString()
  @IsNotEmpty()
  email: string

  @ApiProperty({ example: '1234567890' })
  @Expose()
  @Length(10, 11)
  @Matches(/^\d{10}$|^\d{11}$/, {
    message:
      'Phone number must contain only digits and be 10 or 11 digits long',
  })
  @IsString()
  @IsNotEmpty()
  phone: string

  @ApiProperty({ example: 'John Doe' })
  @Expose()
  @IsString()
  @IsNotEmpty()
  @Length(1, 140)
  name: string
}

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
