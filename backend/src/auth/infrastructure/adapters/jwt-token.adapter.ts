import { TokenProvider } from '@/auth/application/providers/token.provider'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class JwtTokenAdapter implements TokenProvider {
  private readonly accessTokenExpiration = '15m'
  private readonly jwtSecret: string

  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.jwtSecret = this.configService.get<string>('JWT_SECRET')
  }

  async generateAccessToken(user: string): Promise<string> {
    return this.jwtService.signAsync(
      { sub: user },
      {
        secret: this.jwtSecret,
        expiresIn: this.accessTokenExpiration,
      },
    )
  }

  async verifyToken(token: string): Promise<any> {
    return this.jwtService.verifyAsync(token, {
      secret: this.jwtSecret,
    })
  }
}
