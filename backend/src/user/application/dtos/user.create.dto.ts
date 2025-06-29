import { ApiProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'
import { IsNotEmpty, IsString, Length } from 'class-validator'

export class CreateUserDto {
  @ApiProperty({ example: 'aprovame' })
  @Expose()
  @IsString()
  @IsNotEmpty()
  login: string

  @ApiProperty({ example: 'aprovame' })
  @Expose()
  @IsString()
  @IsNotEmpty()
  @Length(6, 140)
  password: string
}
