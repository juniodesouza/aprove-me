import { LoginDto } from '@/auth/application/dtos/login.dto'
import { LoginUseCase } from '@/auth/application/usecases/login.usecase'
import { Body, Controller, Post } from '@nestjs/common'
import { PublicRoute } from '../decorators/public-route.decorator'
import { LoginDoc } from './auth.doc'
import { plainToInstance } from 'class-transformer'
import { AuthResponseDto } from './auth.response.dto'

@Controller('auth')
export class AuthController {
  constructor(private readonly loginUseCase: LoginUseCase) {}

  @LoginDoc()
  @PublicRoute()
  @Post()
  async login(@Body() loginDto: LoginDto) {
    const accessToken = await this.loginUseCase.execute(loginDto)

    return plainToInstance(
      AuthResponseDto,
      {
        accessToken,
      },
      {
        excludeExtraneousValues: true,
      },
    )
  }
}
