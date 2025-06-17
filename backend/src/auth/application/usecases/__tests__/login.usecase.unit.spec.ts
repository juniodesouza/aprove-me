import { Test, TestingModule } from '@nestjs/testing'
import { UnauthorizedException } from '@nestjs/common'
import { TokenProvider } from '@/auth/application/providers/token.provider'
import { HashProvider } from '@/shared/application/providers/hash.provider'
import { UserRepository } from '@/user/domain/user.repository'
import { UserEntity } from '@/user/domain/user.entity'
import { UserDataBuilder } from '@/user/domain/__tests__/user.data-builder'
import { LoginUseCase } from '../login.usecase'
import { LoginDto } from '../../dtos/login.dto'

describe('LoginUseCase unit tests', () => {
  let sut: LoginUseCase
  let tokenProvider: jest.Mocked<TokenProvider>
  let hashProvider: jest.Mocked<HashProvider>
  let userRepository: jest.Mocked<UserRepository>

  beforeEach(async () => {
    const mockAuthRepository = {
      create: jest.fn(),
    }
    const mockTokenProvider = {
      generateAccessToken: jest.fn(),
    }
    const mockHashProvider = {
      compare: jest.fn(),
    }
    const mockUserRepository = {
      findByLogin: jest.fn(),
    }

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LoginUseCase,
        {
          provide: TokenProvider,
          useValue: mockTokenProvider,
        },
        {
          provide: HashProvider,
          useValue: mockHashProvider,
        },
        {
          provide: UserRepository,
          useValue: mockUserRepository,
        },
      ],
    }).compile()

    sut = module.get<LoginUseCase>(LoginUseCase)
    tokenProvider = module.get(TokenProvider)
    hashProvider = module.get(HashProvider)
    userRepository = module.get(UserRepository)
  })

  it('should be defined', () => {
    expect(sut).toBeDefined()
  })

  it('should throw UnauthorizedException if user is not found', async () => {
    const loginDto: LoginDto = {
      login: 'nonexistent@example.com',
      password: 'password',
    }
    userRepository.findByLogin.mockResolvedValue(null)

    await expect(sut.execute(loginDto)).rejects.toThrow(UnauthorizedException)
    expect(userRepository.findByLogin).toHaveBeenCalledWith(loginDto.login)
  })

  it('should throw UnauthorizedException if password is invalid', async () => {
    const loginDto: LoginDto = {
      login: 'test@example.com',
      password: 'wrongpassword',
    }

    const user = new UserEntity(UserDataBuilder())

    userRepository.findByLogin.mockResolvedValue(user)
    hashProvider.compare.mockResolvedValue(false)

    await expect(sut.execute(loginDto)).rejects.toThrow(UnauthorizedException)

    expect(userRepository.findByLogin).toHaveBeenCalledWith(loginDto.login)
    expect(hashProvider.compare).toHaveBeenCalledWith(
      loginDto.password,
      user.props.password,
    )
  })

  it('should return accessToken on successful login', async () => {
    const loginDto: LoginDto = {
      login: 'test@example.com',
      password: 'password',
    }
    const user = new UserEntity(UserDataBuilder())

    userRepository.findByLogin.mockResolvedValue(user)
    hashProvider.compare.mockResolvedValue(true)
    tokenProvider.generateAccessToken.mockResolvedValue('access-token')

    const result = await sut.execute(loginDto)

    expect(userRepository.findByLogin).toHaveBeenCalledWith(loginDto.login)
    expect(hashProvider.compare).toHaveBeenCalledWith(
      loginDto.password,
      user.props.password,
    )
    expect(tokenProvider.generateAccessToken).toHaveBeenCalledWith(
      user.props.login,
    )
  })
})
