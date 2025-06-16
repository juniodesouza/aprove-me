import { Test, TestingModule } from '@nestjs/testing'
import { NotFoundException } from '@nestjs/common'
import { DeletePayableUseCase } from '../payable.delete.usecase'
import { PayableRepository } from '@/payable/domain/payable.repository'
import { PayableEntity } from '@/payable/domain/payable.entity'
import { PayableDataBuilder } from '@/payable/domain/__tests__/payable.data-builder'

describe('DeletePayableUseCase unit tests', () => {
  let sut: DeletePayableUseCase
  let repository: jest.Mocked<PayableRepository>

  beforeEach(async () => {
    const mockRepository = {
      findById: jest.fn(),
      delete: jest.fn(),
    }

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeletePayableUseCase,
        { provide: PayableRepository, useValue: mockRepository },
      ],
    }).compile()

    sut = module.get<DeletePayableUseCase>(DeletePayableUseCase)
    repository = module.get(PayableRepository)
  })

  it('should be defined', () => {
    expect(sut).toBeDefined()
  })

  it('should delete payable when it exists', async () => {
    const entity = new PayableEntity(PayableDataBuilder())

    repository.findById.mockResolvedValue(entity)
    repository.delete.mockResolvedValue()

    await expect(sut.execute(entity.props.id as string)).resolves.toBeUndefined()

    expect(repository.findById).toHaveBeenCalledWith(entity.props.id)
    expect(repository.delete).toHaveBeenCalledWith(entity.props.id)
  })

  it('should throw NotFoundException if payable does not exist', async () => {
    const entity = new PayableEntity(PayableDataBuilder())

    repository.findById.mockResolvedValue(null)

    await expect(sut.execute(entity.props.id as string)).rejects.toThrow(
      NotFoundException,
    )

    expect(repository.findById).toHaveBeenCalledWith(entity.props.id)
    expect(repository.delete).not.toHaveBeenCalled()
  })
})
