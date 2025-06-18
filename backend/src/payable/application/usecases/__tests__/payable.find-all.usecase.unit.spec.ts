import { Test, TestingModule } from '@nestjs/testing'
import { FindAllPayablesUseCase } from '../payable.find-all.usecase'
import { PayableRepository } from '@/payable/domain/payable.repository'
import { PayableEntity } from '@/payable/domain/payable.entity'
import { PayableDataBuilder } from '@/payable/domain/__tests__/payable.data-builder'

describe('FindAllPayablesUseCase unit tests', () => {
  let sut: FindAllPayablesUseCase
  let repository: jest.Mocked<PayableRepository>

  beforeEach(async () => {
    const mockRepository = {
      findAll: jest.fn(),
    }

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindAllPayablesUseCase,
        { provide: PayableRepository, useValue: mockRepository },
      ],
    }).compile()

    sut = module.get<FindAllPayablesUseCase>(FindAllPayablesUseCase)
    repository = module.get(PayableRepository)
  })

  it('should be defined', () => {
    expect(sut).toBeDefined()
  })

  it('should return list of payables', async () => {
    const entity = new PayableEntity(PayableDataBuilder())
    repository.findAll.mockResolvedValue([entity])

    const result = await sut.execute()

    expect(repository.findAll).toHaveBeenCalledTimes(1)
    expect(result).toEqual([entity])
  })
})
