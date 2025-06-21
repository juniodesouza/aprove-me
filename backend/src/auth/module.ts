import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { HashProvider } from '@/shared/application/providers/hash.provider'
import { BcryptHashAdapter } from '@/shared/infrastructure/adapters/bcrypt.adapter'
import { UserModule } from '@/user/user.module'
import { LoginUseCase } from './application/usecases/login.usecase'
import { JwtStrategy } from './infrastructure/strategies/jwt.strategy'
import { TokenProvider } from './application/providers/token.provider'
import { JwtTokenAdapter } from './infrastructure/adapters/jwt-token.adapter'
import { AuthController } from './infrastructure/http/auth.controller'

@Module({
  imports: [JwtModule.register({}), UserModule],
  controllers: [AuthController],
  providers: [
    {
      provide: TokenProvider,
      useClass: JwtTokenAdapter,
    },
    {
      provide: HashProvider,
      useClass: BcryptHashAdapter,
    },
    JwtStrategy,
    LoginUseCase,
  ],
})
export class AuthModule {}
