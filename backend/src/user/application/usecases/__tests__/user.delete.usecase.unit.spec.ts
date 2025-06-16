import { Test, TestingModule } from '@nestjs/testing'
import { NotFoundException } from '@nestjs/common'
import { DeleteUserUseCase } from '../user.delete.usecase'
import { UserRepository } from '@/user/domain/user.repository'
import { UserEntity } from '@/user/domain/user.entity'
import { UserDataBuilder } from '@/user/domain/__tests__/user.data-builder'

describe('DeleteUserUseCase unit tests', () => {
  let sut: DeleteUserUseCase
  let repository: jest.Mocked<UserRepository>

  beforeEach(async () => {
    const mockRepository = {
      findById: jest.fn(),
      delete: jest.fn(),
    }

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeleteUserUseCase,
        {
          provide: UserRepository,
          useValue: mockRepository,
        },
      ],
    }).compile()

    sut = module.get<DeleteUserUseCase>(DeleteUserUseCase)
    repository = module.get(UserRepository)
  })

  it('should be defined', () => {
    expect(sut).toBeDefined()
  })

  it('should delete user when it exists', async () => {
    const entity = new UserEntity(UserDataBuilder())

    repository.findById.mockResolvedValue(entity)
    repository.delete.mockResolvedValue()

    await expect(sut.execute(entity.props.id as string)).resolves.toBeUndefined()

    expect(repository.findById).toHaveBeenCalledWith(entity.props.id)
    expect(repository.delete).toHaveBeenCalledWith(entity.props.id)
  })

  it('should throw NotFoundException if user does not exist', async () => {
    const entity = new UserEntity(UserDataBuilder())

    repository.findById.mockResolvedValue(null)

    await expect(sut.execute(entity.props.id as string)).rejects.toThrow(
      NotFoundException,
    )

    expect(repository.findById).toHaveBeenCalledWith(entity.props.id)
    expect(repository.delete).not.toHaveBeenCalled()
  })
})
