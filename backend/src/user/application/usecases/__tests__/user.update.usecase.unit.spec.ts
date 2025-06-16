import { Test, TestingModule } from '@nestjs/testing'
import { NotFoundException } from '@nestjs/common'
import { UpdateUserUseCase } from '../user.update.usecase'
import { UserRepository } from '@/user/domain/user.repository'
import { UserEntity } from '@/user/domain/user.entity'
import { UserDataBuilder } from '@/user/domain/__tests__/user.data-builder'
import { UpdateUserDto } from '../../dtos/user.update.dto'

describe('UpdateUserUseCase unit tests', () => {
  let sut: UpdateUserUseCase
  let repository: jest.Mocked<UserRepository>

  beforeEach(async () => {
    const mockRepository = {
      findById: jest.fn(),
      update: jest.fn(),
    }

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateUserUseCase,
        {
          provide: UserRepository,
          useValue: mockRepository,
        },
      ],
    }).compile()

    sut = module.get<UpdateUserUseCase>(UpdateUserUseCase)
    repository = module.get(UserRepository)
  })

  it('should be defined', () => {
    expect(sut).toBeDefined()
  })

  it('should update user when it exists', async () => {
    const entity = new UserEntity(UserDataBuilder())
    const updateData: UpdateUserDto = { login: 'new@login.com' }
    const updatedEntity = new UserEntity({ ...entity.props, ...updateData })

    repository.findById.mockResolvedValue(entity)
    repository.update.mockResolvedValue(updatedEntity)

    const result = await sut.execute({
      id: entity.props.id as string,
      data: updateData,
    })

    expect(repository.findById).toHaveBeenCalledWith(entity.props.id)
    expect(repository.update).toHaveBeenCalledWith(expect.any(UserEntity))
    expect(result).toEqual(updatedEntity)
  })

  it('should throw NotFoundException if user does not exist', async () => {
    const entity = new UserEntity(UserDataBuilder())

    repository.findById.mockResolvedValue(null)

    await expect(
      sut.execute({ id: entity.props.id as string, data: {} }),
    ).rejects.toThrow(NotFoundException)

    expect(repository.findById).toHaveBeenCalledWith(entity.props.id)
    expect(repository.update).not.toHaveBeenCalled()
  })
})
