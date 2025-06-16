import { Test, TestingModule } from '@nestjs/testing'
import { NotFoundException } from '@nestjs/common'
import { UpdatePayableUseCase } from '../payable.update.usecase'
import { PayableRepository } from '@/payable/domain/payable.repository'
import { PayableEntity } from '@/payable/domain/payable.entity'
import { PayableDataBuilder } from '@/payable/domain/__tests__/payable.data-builder'
import { UpdatePayableDto } from '../../dtos/payable.update.dto'

describe('UpdatePayableUseCase unit tests', () => {
  let sut: UpdatePayableUseCase
  let repository: jest.Mocked<PayableRepository>

  beforeEach(async () => {
    const mockRepository = {
      findById: jest.fn(),
      update: jest.fn(),
    }

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdatePayableUseCase,
        { provide: PayableRepository, useValue: mockRepository },
      ],
    }).compile()

    sut = module.get<UpdatePayableUseCase>(UpdatePayableUseCase)
    repository = module.get(PayableRepository)
  })

  it('should be defined', () => {
    expect(sut).toBeDefined()
  })

  it('should update payable when it exists', async () => {
    const entity = new PayableEntity(PayableDataBuilder())
    const updateData: UpdatePayableDto = { value: 500 }
    const updatedEntity = new PayableEntity({ ...entity.props, ...updateData })

    repository.findById.mockResolvedValue(entity)
    repository.update.mockResolvedValue(updatedEntity)

    const result = await sut.execute({ id: entity.props.id as string, data: updateData })

    expect(repository.findById).toHaveBeenCalledWith(entity.props.id)
    expect(repository.update).toHaveBeenCalledWith(expect.any(PayableEntity))
    expect(result).toEqual(updatedEntity)
  })

  it('should throw NotFoundException if payable does not exist', async () => {
    const entity = new PayableEntity(PayableDataBuilder())

    repository.findById.mockResolvedValue(null)

    await expect(
      sut.execute({ id: entity.props.id as string, data: {} }),
    ).rejects.toThrow(NotFoundException)

    expect(repository.findById).toHaveBeenCalledWith(entity.props.id)
    expect(repository.update).not.toHaveBeenCalled()
  })
})
