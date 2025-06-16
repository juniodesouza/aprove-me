import { Test, TestingModule } from '@nestjs/testing'
import { NotFoundException } from '@nestjs/common'
import { CreatePayableUseCase } from '../payable.create.usecase'
import { PayableRepository } from '@/payable/domain/payable.repository'
import { AssignorRepository } from '@/assignor/domain/assignor.repository'
import { PayableEntity } from '@/payable/domain/payable.entity'
import { AssignorEntity } from '@/assignor/domain/assignor.entity'
import { PayableDataBuilder } from '@/payable/domain/__tests__/payable.data-builder'
import { AssignorDataBuilder } from '@/assignor/domain/__tests__/assignor.data-builder'

describe('CreatePayableUseCase unit tests', () => {
  let sut: CreatePayableUseCase
  let payableRepository: jest.Mocked<PayableRepository>
  let assignorRepository: jest.Mocked<AssignorRepository>

  beforeEach(async () => {
    const mockPayableRepository = {
      create: jest.fn(),
    }
    const mockAssignorRepository = {
      findById: jest.fn(),
    }

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreatePayableUseCase,
        { provide: PayableRepository, useValue: mockPayableRepository },
        { provide: AssignorRepository, useValue: mockAssignorRepository },
      ],
    }).compile()

    sut = module.get<CreatePayableUseCase>(CreatePayableUseCase)
    payableRepository = module.get(PayableRepository)
    assignorRepository = module.get(AssignorRepository)
  })

  it('should be defined', () => {
    expect(sut).toBeDefined()
  })

  it('should create a new payable when assignor exists', async () => {
    const assignor = new AssignorEntity(AssignorDataBuilder())
    const data = PayableDataBuilder({ assignorId: assignor.props.id })
    const payable = new PayableEntity(data)

    assignorRepository.findById.mockResolvedValue(assignor)
    payableRepository.create.mockResolvedValue(payable)

    const result = await sut.execute({
      value: data.value,
      emissionDate: data.emissionDate,
      assignorId: data.assignorId,
    })

    expect(assignorRepository.findById).toHaveBeenCalledWith(data.assignorId)
    expect(payableRepository.create).toHaveBeenCalledWith(expect.any(PayableEntity))
    expect(result).toEqual(payable)
  })

  it('should throw NotFoundException if assignor does not exist', async () => {
    const data = PayableDataBuilder()

    assignorRepository.findById.mockResolvedValue(null)

    await expect(
      sut.execute({
        value: data.value,
        emissionDate: data.emissionDate,
        assignorId: data.assignorId,
      }),
    ).rejects.toThrow(NotFoundException)

    expect(assignorRepository.findById).toHaveBeenCalledWith(data.assignorId)
    expect(payableRepository.create).not.toHaveBeenCalled()
  })
})
