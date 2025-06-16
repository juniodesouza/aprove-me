import { Test, TestingModule } from '@nestjs/testing'
import { ConflictException } from '@nestjs/common'
import { UserRepository } from '@/user/domain/user.repository'
import { CreateUserDto } from '../../dtos/user.create.dto'
import { UserEntity } from '@/user/domain/user.entity'
import { CreateUserUseCase } from '../user.create.usecase'
import { UserDataBuilder } from '@/user/domain/__tests__/user.data-builder'

describe('CreateUserUseCase unit tests', () => {
  let sut: CreateUserUseCase
  let repository: jest.Mocked<UserRepository>

  beforeEach(async () => {
    const mockRepository = {
      findByLogin: jest.fn(),
      create: jest.fn(),
    }

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateUserUseCase,
        {
          provide: UserRepository,
          useValue: mockRepository,
        },
      ],
    }).compile()

    sut = module.get<CreateUserUseCase>(CreateUserUseCase)
    repository = module.get(UserRepository)
  })

  it('should be defined', () => {
    expect(sut).toBeDefined()
  })

  it('should create a new user when login does not exist', async () => {
    const entity = new UserEntity(UserDataBuilder())

    repository.findByLogin.mockResolvedValue(null)
    repository.create.mockResolvedValue(entity)

    const result = await sut.execute(entity.props as CreateUserDto)

    expect(repository.findByLogin).toHaveBeenCalledWith(entity.props.login)
    expect(repository.create).toHaveBeenCalledWith(expect.any(UserEntity))
    expect(result).toEqual(entity)
  })

  it('should throw ConflictException if user login already exists', async () => {
    const entity = new UserEntity(UserDataBuilder())

    repository.findByLogin.mockResolvedValue(entity)

    await expect(sut.execute(entity.props as CreateUserDto)).rejects.toThrow(
      ConflictException,
    )

    expect(repository.findByLogin).toHaveBeenCalledWith(entity.props.login)
    expect(repository.create).not.toHaveBeenCalled()
  })
})
