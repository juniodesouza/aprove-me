import { Test, TestingModule } from '@nestjs/testing'
import { NotFoundException } from '@nestjs/common'
import { DeleteAssignorUseCase } from '../assignor.delete.usecase'
import { AssignorRepository } from '@/assignor/domain/assignor.repository'
import { AssignorEntity } from '@/assignor/domain/assignor.entity'
import { AssignorDataBuilder } from '@/assignor/domain/__tests__/assignor.data-builder'

describe('DeleteAssignorUseCase unit tests', () => {
  let sut: DeleteAssignorUseCase
  let repository: jest.Mocked<AssignorRepository>

  beforeEach(async () => {
    const mockRepository = {
      findById: jest.fn(),
      delete: jest.fn(),
    }

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeleteAssignorUseCase,
        {
          provide: AssignorRepository,
          useValue: mockRepository,
        },
      ],
    }).compile()

    sut = module.get<DeleteAssignorUseCase>(DeleteAssignorUseCase)
    repository = module.get(AssignorRepository)
  })

  it('should be defined', () => {
    expect(sut).toBeDefined()
  })

  it('should delete assignor when it exists', async () => {
    const entity = new AssignorEntity(AssignorDataBuilder())

    repository.findById.mockResolvedValue(entity)
    repository.delete.mockResolvedValue()

    await expect(
      sut.execute(entity.props.id as string),
    ).resolves.toBeUndefined()

    expect(repository.findById).toHaveBeenCalledWith(entity.props.id)
    expect(repository.delete).toHaveBeenCalledWith(entity.props.id)
  })

  it('should throw NotFoundException if assignor does not exist', async () => {
    const entity = new AssignorEntity(AssignorDataBuilder())

    repository.findById.mockResolvedValue(null)

    await expect(sut.execute(entity.props.id as string)).rejects.toThrow(
      NotFoundException,
    )

    expect(repository.findById).toHaveBeenCalledWith(entity.props.id)
    expect(repository.delete).not.toHaveBeenCalled()
  })
})
