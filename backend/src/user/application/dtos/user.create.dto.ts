import { ApiProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'
import { IsNotEmpty, IsString, Length } from 'class-validator'

export class CreateUserDto {
  @ApiProperty({ example: 'user@example.com' })
  @Expose()
  @IsString()
  @IsNotEmpty()
  login: string

  @ApiProperty({ example: 'P@ssw0rd' })
  @Expose()
  @IsString()
  @IsNotEmpty()
  @Length(6, 140)
  password: string
}
