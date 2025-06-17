import { Test, TestingModule } from '@nestjs/testing'
import { AuthController } from '../auth.controller'
import { LoginUseCase } from '@/auth/application/usecases/login.usecase'
import { LoginDto } from '@/auth/application/dtos/login.dto'
import { AuthResponseDto } from '../auth.response.dto'

describe('AuthController unit tests', () => {
  let sut: AuthController
  let loginUseCase: jest.Mocked<LoginUseCase>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: LoginUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
    }).compile()

    sut = module.get<AuthController>(AuthController)
    loginUseCase = module.get(LoginUseCase)
  })

  it('should be defined', () => {
    expect(sut).toBeDefined()
  })

  it('should call LoginUseCase.execute with the provided LoginDto', async () => {
    loginUseCase.execute.mockResolvedValue('mocked_acess_token')

    const loginDto: LoginDto = {
      login: 'aprovame',
      password: 'aprovame',
    }

    const result = await sut.login(loginDto)

    expect(loginUseCase.execute).toHaveBeenCalledWith(loginDto)
    expect(loginUseCase.execute).toHaveBeenCalledTimes(1)
    expect(result).toBeInstanceOf(AuthResponseDto)
  })
})
