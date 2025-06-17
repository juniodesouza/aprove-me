import { Test, TestingModule } from '@nestjs/testing'
import { ConfigService } from '@nestjs/config'
import { JwtPayload, JwtStrategy } from '../jwt.strategy'

describe('JwtStrategy unit test', () => {
  let sut: JwtStrategy
  let configService: jest.Mocked<ConfigService>

  beforeEach(async () => {
    const mockConfigService: jest.Mocked<ConfigService> = {
      get: jest.fn().mockReturnValue('mock_jwt_secret'),
    } as any

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JwtStrategy,
        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
      ],
    }).compile()

    sut = module.get(JwtStrategy)
    configService = module.get(ConfigService)
  })

  it('should be defined', () => {
    expect(sut).toBeDefined()
  })

  it('should return user object with id when payload', async () => {
    const payload: JwtPayload = {
      sub: 'aprovame',
    }

    const result = await sut.validate(payload)

    expect(result).toEqual({ id: 'aprovame' })
  })
})
