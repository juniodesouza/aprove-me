import { Test, TestingModule } from '@nestjs/testing'
import { plainToInstance } from 'class-transformer'
import { PayableController } from '../payable.controller'
import { CreatePayableUseCase } from '@/payable/application/usecases/payable.create.usecase'
import { FindPayableByIdUseCase } from '@/payable/application/usecases/payable.find-by-id.usecase'
import { UpdatePayableUseCase } from '@/payable/application/usecases/payable.update.usecase'
import { DeletePayableUseCase } from '@/payable/application/usecases/payable.delete.usecase'
import { FindAllPayablesUseCase } from '@/payable/application/usecases/payable.find-all.usecase'
import { PayableEntity } from '@/payable/domain/payable.entity'
import { PayableDataBuilder } from '@/payable/domain/__tests__/payable.data-builder'
import { CreatePayableDto } from '@/payable/application/dtos/payable.create.dto'
import { PayableResponseDto } from '../payable.response.dto'
import { UpdatePayableDto } from '@/payable/application/dtos/payable.update.dto'

describe('PayableController unit tests', () => {
  let sut: PayableController
  let createPayableUseCase: jest.Mocked<CreatePayableUseCase>
  let findPayableByIdUseCase: jest.Mocked<FindPayableByIdUseCase>
  let findAllPayablesUseCase: jest.Mocked<FindAllPayablesUseCase>
  let updatePayableUseCase: jest.Mocked<UpdatePayableUseCase>
  let deletePayableUseCase: jest.Mocked<DeletePayableUseCase>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PayableController],
      providers: [
        {
          provide: CreatePayableUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: FindPayableByIdUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: FindAllPayablesUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: UpdatePayableUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: DeletePayableUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
    }).compile()

    sut = module.get<PayableController>(PayableController)
    createPayableUseCase = module.get(CreatePayableUseCase)
    findPayableByIdUseCase = module.get(FindPayableByIdUseCase)
    findAllPayablesUseCase = module.get(FindAllPayablesUseCase)
    updatePayableUseCase = module.get(UpdatePayableUseCase)
    deletePayableUseCase = module.get(DeletePayableUseCase)
  })

  it('should be defined', () => {
    expect(sut).toBeDefined()
  })

  it('should create a payable successfully', async () => {
    const entity = new PayableEntity(PayableDataBuilder())

    createPayableUseCase.execute.mockResolvedValue(entity)

    const createPayableDto = plainToInstance(CreatePayableDto, entity, {
      excludeExtraneousValues: true,
    })

    const result = await sut.create(createPayableDto)

    expect(createPayableUseCase.execute).toHaveBeenCalledWith(createPayableDto)
    expect(createPayableUseCase.execute).toHaveBeenCalledTimes(1)
    expect(result).toBeInstanceOf(PayableResponseDto)
  })

  it('should list payables successfully', async () => {
    const entity = new PayableEntity(PayableDataBuilder())
    findAllPayablesUseCase.execute.mockResolvedValue([entity])

    const result = await sut.findAll()

    expect(findAllPayablesUseCase.execute).toHaveBeenCalledTimes(1)
    expect(result[0]).toBeInstanceOf(PayableResponseDto)
  })

  it('should find a payable by id successfully', async () => {
    const entity = new PayableEntity(PayableDataBuilder())

    findPayableByIdUseCase.execute = jest.fn().mockResolvedValue(entity)

    const result = await sut.findById(entity.props.id)

    expect(findPayableByIdUseCase.execute).toHaveBeenCalledWith(entity.props.id)
    expect(findPayableByIdUseCase.execute).toHaveBeenCalledTimes(1)
    expect(result.id).toStrictEqual(entity.props.id)
    expect(result).toBeInstanceOf(PayableResponseDto)
  })

  it('should update a payable successfully', async () => {
    const entity = new PayableEntity(PayableDataBuilder())

    updatePayableUseCase.execute.mockResolvedValue(entity)

    const updatePayableDto = plainToInstance(UpdatePayableDto, entity, {
      excludeExtraneousValues: true,
    })

    const result = await sut.update(entity.props.id, updatePayableDto)

    expect(updatePayableUseCase.execute).toHaveBeenCalledWith({
      id: entity.props.id,
      data: updatePayableDto,
    })
    expect(updatePayableUseCase.execute).toHaveBeenCalledTimes(1)
    expect(result).toBeInstanceOf(PayableResponseDto)
  })

  it('should delete a payable successfully', async () => {
    const entity = new PayableEntity(PayableDataBuilder())

    const result = await sut.remove('fake-uuid')

    expect(deletePayableUseCase.execute).toHaveBeenCalledWith('fake-uuid')
    expect(deletePayableUseCase.execute).toHaveBeenCalledTimes(1)
    expect(result).toEqual(undefined)
  })
})
