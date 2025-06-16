import { Test, TestingModule } from '@nestjs/testing'
import { NotFoundException } from '@nestjs/common'
import { FindPayableByIdUseCase } from '../payable.find-by-id.usecase'
import { PayableRepository } from '@/payable/domain/payable.repository'
import { PayableEntity } from '@/payable/domain/payable.entity'
import { PayableDataBuilder } from '@/payable/domain/__tests__/payable.data-builder'

describe('FindPayableByIdUseCase unit tests', () => {
  let sut: FindPayableByIdUseCase
  let repository: jest.Mocked<PayableRepository>

  beforeEach(async () => {
    const mockRepository = {
      findById: jest.fn(),
    }

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindPayableByIdUseCase,
        { provide: PayableRepository, useValue: mockRepository },
      ],
    }).compile()

    sut = module.get<FindPayableByIdUseCase>(FindPayableByIdUseCase)
    repository = module.get(PayableRepository)
  })

  it('should be defined', () => {
    expect(sut).toBeDefined()
  })

  it('should return payable when found', async () => {
    const entity = new PayableEntity(PayableDataBuilder())

    repository.findById.mockResolvedValue(entity)

    const result = await sut.execute(entity.props.id as string)

    expect(repository.findById).toHaveBeenCalledWith(entity.props.id)
    expect(result).toEqual(entity)
  })

  it('should throw NotFoundException if payable does not exist', async () => {
    const entity = new PayableEntity(PayableDataBuilder())

    repository.findById.mockResolvedValue(null)

    await expect(sut.execute(entity.props.id as string)).rejects.toThrow(
      NotFoundException,
    )

    expect(repository.findById).toHaveBeenCalledWith(entity.props.id)
  })
})
