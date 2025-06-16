import { Test, TestingModule } from '@nestjs/testing'
import { ConflictException } from '@nestjs/common'
import { AssignorRepository } from '@/assignor/domain/assignor.repository'
import { CreateAssignorDto } from '../../dtos/assignor.create.dto'
import { AssignorEntity } from '@/assignor/domain/assignor.entity'
import { CreateAssignorUseCase } from '../assignor.create.usecase'
import { AssignorDataBuilder } from '@/assignor/domain/__tests__/assignor.data-builder'

describe('CreateAssignorUseCase unit tests', () => {
  let sut: CreateAssignorUseCase
  let repository: jest.Mocked<AssignorRepository>

  beforeEach(async () => {
    const mockRepository = {
      findByDocument: jest.fn(),
      create: jest.fn(),
    }

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateAssignorUseCase,
        {
          provide: AssignorRepository,
          useValue: mockRepository,
        },
      ],
    }).compile()

    sut = module.get<CreateAssignorUseCase>(CreateAssignorUseCase)
    repository = module.get(AssignorRepository)
  })

  it('should be defined', () => {
    expect(sut).toBeDefined()
  })

  it('should create a new assignor when document does not exist', async () => {
    const entity = new AssignorEntity(AssignorDataBuilder())

    repository.findByDocument.mockResolvedValue(null)
    repository.create.mockResolvedValue(entity)

    const result = await sut.execute(entity.props)

    expect(repository.findByDocument).toHaveBeenCalledWith(
      entity.props.document,
    )
    expect(repository.create).toHaveBeenCalledWith(expect.any(AssignorEntity))
    expect(result).toEqual(entity)
  })

  it('should throw ConflictException if assignor document already exists', async () => {
    const entity = new AssignorEntity(AssignorDataBuilder())

    repository.findByDocument.mockResolvedValue(entity)

    await expect(sut.execute(entity.props)).rejects.toThrow(ConflictException)

    expect(repository.findByDocument).toHaveBeenCalledWith(
      entity.props.document,
    )
    expect(repository.create).not.toHaveBeenCalled()
  })
})
