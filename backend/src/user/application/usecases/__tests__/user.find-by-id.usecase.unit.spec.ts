import { Test, TestingModule } from '@nestjs/testing'
import { NotFoundException } from '@nestjs/common'
import { FindUserByIdUseCase } from '../user.find-by-id.usecase'
import { UserRepository } from '@/user/domain/user.repository'
import { UserEntity } from '@/user/domain/user.entity'
import { UserDataBuilder } from '@/user/domain/__tests__/user.data-builder'

describe('FindUserByIdUseCase unit tests', () => {
  let sut: FindUserByIdUseCase
  let repository: jest.Mocked<UserRepository>

  beforeEach(async () => {
    const mockRepository = {
      findById: jest.fn(),
    }

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindUserByIdUseCase,
        {
          provide: UserRepository,
          useValue: mockRepository,
        },
      ],
    }).compile()

    sut = module.get<FindUserByIdUseCase>(FindUserByIdUseCase)
    repository = module.get(UserRepository)
  })

  it('should be defined', () => {
    expect(sut).toBeDefined()
  })

  it('should return user when found', async () => {
    const entity = new UserEntity(UserDataBuilder())

    repository.findById.mockResolvedValue(entity)

    const result = await sut.execute(entity.props.id as string)

    expect(repository.findById).toHaveBeenCalledWith(entity.props.id)
    expect(result).toEqual(entity)
  })

  it('should throw NotFoundException if user does not exist', async () => {
    const entity = new UserEntity(UserDataBuilder())

    repository.findById.mockResolvedValue(null)

    await expect(sut.execute(entity.props.id as string)).rejects.toThrow(
      NotFoundException,
    )

    expect(repository.findById).toHaveBeenCalledWith(entity.props.id)
  })
})
