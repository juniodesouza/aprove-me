import { Injectable, UnauthorizedException } from '@nestjs/common'
import { LoginDto } from '../dtos/login.dto'
import { TokenProvider } from '../providers/token.provider'
import { HashProvider } from '@/shared/application/providers/hash.provider'
import { UserRepository } from '@/user/domain/user.repository'

@Injectable()
export class LoginUseCase {
  constructor(
    private readonly tokenProvider: TokenProvider,
    private readonly hashProvider: HashProvider,
    private readonly userRepository: UserRepository,
  ) {}

  async execute(dto: LoginDto): Promise<string> {
    const user = await this.userRepository.findByLogin(dto.login)
    if (!user) {
      throw new UnauthorizedException('Invalid credentials')
    }

    const isPasswordValid = await this.hashProvider.compare(
      dto.password,
      user.props.password,
    )
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials')
    }

    const accessToken = await this.tokenProvider.generateAccessToken(
      user.props.login,
    )

    return accessToken
  }
}
