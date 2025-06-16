import { Test, TestingModule } from '@nestjs/testing'
import { NotFoundException } from '@nestjs/common'
import { UpdateAssignorUseCase } from '../assignor.update.usecase'
import { AssignorRepository } from '@/assignor/domain/assignor.repository'
import { AssignorEntity } from '@/assignor/domain/assignor.entity'
import { AssignorDataBuilder } from '@/assignor/domain/__tests__/assignor.data-builder'
import { UpdateAssignorDto } from '../../dtos/assignor.update.dto'

describe('UpdateAssignorUseCase unit tests', () => {
  let sut: UpdateAssignorUseCase
  let repository: jest.Mocked<AssignorRepository>

  beforeEach(async () => {
    const mockRepository = {
      findById: jest.fn(),
      update: jest.fn(),
    }

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateAssignorUseCase,
        {
          provide: AssignorRepository,
          useValue: mockRepository,
        },
      ],
    }).compile()

    sut = module.get<UpdateAssignorUseCase>(UpdateAssignorUseCase)
    repository = module.get(AssignorRepository)
  })

  it('should be defined', () => {
    expect(sut).toBeDefined()
  })

  it('should update assignor when it exists', async () => {
    const entity = new AssignorEntity(AssignorDataBuilder())
    const updateData: UpdateAssignorDto = { name: 'new name' }
    const updatedEntity = new AssignorEntity({ ...entity.props, ...updateData })

    repository.findById.mockResolvedValue(entity)
    repository.update.mockResolvedValue(updatedEntity)

    const result = await sut.execute({
      id: entity.props.id as string,
      data: updateData,
    })

    expect(repository.findById).toHaveBeenCalledWith(entity.props.id)
    expect(repository.update).toHaveBeenCalledWith(expect.any(AssignorEntity))
    expect(result).toEqual(updatedEntity)
  })

  it('should throw NotFoundException if assignor does not exist', async () => {
    const entity = new AssignorEntity(AssignorDataBuilder())

    repository.findById.mockResolvedValue(null)

    await expect(
      sut.execute({ id: entity.props.id as string, data: {} }),
    ).rejects.toThrow(NotFoundException)

    expect(repository.findById).toHaveBeenCalledWith(entity.props.id)
    expect(repository.update).not.toHaveBeenCalled()
  })
})
