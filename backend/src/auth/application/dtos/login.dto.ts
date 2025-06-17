import { ApiProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'
import { IsNotEmpty, IsString } from 'class-validator'

export class LoginDto {
  @Expose()
  @ApiProperty({ example: 'aprovame' })
  @IsString()
  @IsNotEmpty()
  login: string

  @Expose()
  @ApiProperty({ example: 'aprovame' })
  @IsString()
  @IsNotEmpty()
  password: string
}
