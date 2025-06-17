import { Test, TestingModule } from '@nestjs/testing'
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
import { JwtTokenAdapter } from '../jwt-token.adapter'

describe('JwtTokenAdapter unit test', () => {
  let sut: JwtTokenAdapter
  let jwtService: jest.Mocked<JwtService>
  let configService: jest.Mocked<ConfigService>

  beforeEach(async () => {
    const mockJwtService: jest.Mocked<JwtService> = {
      signAsync: jest.fn(),
      verifyAsync: jest.fn(),
    } as any

    const mockConfigService: jest.Mocked<ConfigService> = {
      get: jest.fn().mockReturnValue('test_jwt_secret'),
    } as any

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JwtTokenAdapter,
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
      ],
    }).compile()

    sut = module.get(JwtTokenAdapter)
    jwtService = module.get(JwtService)
    configService = module.get(ConfigService)
  })

  it('should be defined', () => {
    expect(sut).toBeDefined()
  })

  describe('generateAccessToken', () => {
    it('should call signAsync with correct payload and options', async () => {
      jwtService.signAsync.mockResolvedValue('access_token')
      const user = 'aprovame'

      const result = await sut.generateAccessToken(user)

      expect(jwtService.signAsync).toHaveBeenCalledWith(
        { sub: user },
        {
          secret: 'test_jwt_secret',
          expiresIn: '15m',
        },
      )
      expect(result).toBe('access_token')
    })
  })

  describe('verifyToken', () => {
    it('should call verifyAsync with correct token and secret', async () => {
      const token = 'jwt_token'
      const payload = { sub: 'aprovame' }
      jwtService.verifyAsync.mockResolvedValue(payload)

      const result = await sut.verifyToken(token)

      expect(jwtService.verifyAsync).toHaveBeenCalledWith(token, {
        secret: 'test_jwt_secret',
      })
      expect(result).toEqual(payload)
    })
  })
})
