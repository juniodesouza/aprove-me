import { Test, TestingModule } from '@nestjs/testing'
import { NotFoundException } from '@nestjs/common'
import { FindAssignorByIdUseCase } from '../assignor.find-by-id.usecase'
import { AssignorRepository } from '@/assignor/domain/assignor.repository'
import { AssignorEntity } from '@/assignor/domain/assignor.entity'
import { AssignorDataBuilder } from '@/assignor/domain/__tests__/assignor.data-builder'

describe('FindAssignorByIdUseCase unit tests', () => {
  let sut: FindAssignorByIdUseCase
  let repository: jest.Mocked<AssignorRepository>

  beforeEach(async () => {
    const mockRepository = {
      findById: jest.fn(),
    }

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindAssignorByIdUseCase,
        {
          provide: AssignorRepository,
          useValue: mockRepository,
        },
      ],
    }).compile()

    sut = module.get<FindAssignorByIdUseCase>(FindAssignorByIdUseCase)
    repository = module.get(AssignorRepository)
  })

  it('should be defined', () => {
    expect(sut).toBeDefined()
  })

  it('should return assignor when found', async () => {
    const entity = new AssignorEntity(AssignorDataBuilder())

    repository.findById.mockResolvedValue(entity)

    const result = await sut.execute(entity.props.id as string)

    expect(repository.findById).toHaveBeenCalledWith(entity.props.id)
    expect(result).toEqual(entity)
  })

  it('should throw NotFoundException if assignor does not exist', async () => {
    const entity = new AssignorEntity(AssignorDataBuilder())

    repository.findById.mockResolvedValue(null)

    await expect(sut.execute(entity.props.id as string)).rejects.toThrow(
      NotFoundException,
    )

    expect(repository.findById).toHaveBeenCalledWith(entity.props.id)
  })
})
