import { Test, TestingModule } from '@nestjs/testing'
import { FindAllAssignorsUseCase } from '../assignor.find-all.usecase'
import { AssignorRepository } from '@/assignor/domain/assignor.repository'
import { AssignorEntity } from '@/assignor/domain/assignor.entity'
import { AssignorDataBuilder } from '@/assignor/domain/__tests__/assignor.data-builder'

describe('FindAllAssignorsUseCase unit tests', () => {
  let sut: FindAllAssignorsUseCase
  let repository: jest.Mocked<AssignorRepository>

  beforeEach(async () => {
    const mockRepository = {
      findAll: jest.fn(),
    }

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindAllAssignorsUseCase,
        { provide: AssignorRepository, useValue: mockRepository },
      ],
    }).compile()

    sut = module.get<FindAllAssignorsUseCase>(FindAllAssignorsUseCase)
    repository = module.get(AssignorRepository)
  })

  it('should be defined', () => {
    expect(sut).toBeDefined()
  })

  it('should return list of assignors', async () => {
    const entity = new AssignorEntity(AssignorDataBuilder())
    repository.findAll.mockResolvedValue([entity])

    const result = await sut.execute()

    expect(repository.findAll).toHaveBeenCalledTimes(1)
    expect(result).toEqual([entity])
  })
})
