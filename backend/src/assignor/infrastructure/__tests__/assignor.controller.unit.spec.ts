import { Test, TestingModule } from '@nestjs/testing'
import { plainToInstance } from 'class-transformer'
import { AssignorController } from '../assignor.controller'
import { CreateAssignorUseCase } from '@/assignor/application/usecases/assignor.create.usecase'
import { FindAssignorByIdUseCase } from '@/assignor/application/usecases/assignor.find-by-id.usecase'
import { UpdateAssignorUseCase } from '@/assignor/application/usecases/assignor.update.usecase'
import { DeleteAssignorUseCase } from '@/assignor/application/usecases/assignor.delete.usecase'
import { AssignorEntity } from '@/assignor/domain/assignor.entity'
import { AssignorDataBuilder } from '@/assignor/domain/__tests__/assignor.data-builder'
import { CreateAssignorDto } from '@/assignor/application/dtos/assignor.create.dto'
import { AssignorResponseDto } from '../assignor.response.dto'
import { UpdateAssignorDto } from '@/assignor/application/dtos/assignor.update.dto'

describe('AssignorController unit tests', () => {
  let sut: AssignorController
  let createAssignorUseCase: jest.Mocked<CreateAssignorUseCase>
  let findAssignorByIdUseCase: jest.Mocked<FindAssignorByIdUseCase>
  let updateAssignorUseCase: jest.Mocked<UpdateAssignorUseCase>
  let deleteAssignorUseCase: jest.Mocked<DeleteAssignorUseCase>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AssignorController],
      providers: [
        {
          provide: CreateAssignorUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: FindAssignorByIdUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: UpdateAssignorUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: DeleteAssignorUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
    }).compile()

    sut = module.get<AssignorController>(AssignorController)
    createAssignorUseCase = module.get(CreateAssignorUseCase)
    findAssignorByIdUseCase = module.get(FindAssignorByIdUseCase)
    updateAssignorUseCase = module.get(UpdateAssignorUseCase)
    deleteAssignorUseCase = module.get(DeleteAssignorUseCase)
  })

  it('should be defined', () => {
    expect(sut).toBeDefined()
  })

  it('should create a assignor successfully', async () => {
    const entity = new AssignorEntity(AssignorDataBuilder())

    createAssignorUseCase.execute.mockResolvedValue(entity)

    const createCarDto = plainToInstance(CreateAssignorDto, entity, {
      excludeExtraneousValues: true,
    })

    const result = await sut.create(createCarDto)

    expect(createAssignorUseCase.execute).toHaveBeenCalledWith(createCarDto)
    expect(createAssignorUseCase.execute).toHaveBeenCalledTimes(1)
    expect(result).toBeInstanceOf(AssignorResponseDto)
  })

  it('should find a assignor by id successfully', async () => {
    const entity = new AssignorEntity(AssignorDataBuilder())

    findAssignorByIdUseCase.execute = jest.fn().mockResolvedValue(entity)

    const result = await sut.findById(entity.props.id)

    expect(findAssignorByIdUseCase.execute).toHaveBeenCalledWith(
      entity.props.id,
    )
    expect(findAssignorByIdUseCase.execute).toHaveBeenCalledTimes(1)
    expect(result.id).toStrictEqual(entity.props.id)
    expect(result).toBeInstanceOf(AssignorResponseDto)
  })

  it('should update a assignor successfully', async () => {
    const entity = new AssignorEntity(AssignorDataBuilder())

    updateAssignorUseCase.execute.mockResolvedValue(entity)

    const updateAssignorDto = plainToInstance(UpdateAssignorDto, entity, {
      excludeExtraneousValues: true,
    })

    const result = await sut.update(entity.props.id, updateAssignorDto)

    expect(updateAssignorUseCase.execute).toHaveBeenCalledWith({
      id: entity.props.id,
      data: updateAssignorDto,
    })
    expect(updateAssignorUseCase.execute).toHaveBeenCalledTimes(1)
    expect(result).toBeInstanceOf(AssignorResponseDto)
  })

  it('should delete a assignor successfully', async () => {
    const entity = new AssignorEntity(AssignorDataBuilder())

    const result = await sut.remove('fake-uuid')

    expect(deleteAssignorUseCase.execute).toHaveBeenCalledWith('fake-uuid')
    expect(deleteAssignorUseCase.execute).toHaveBeenCalledTimes(1)
    expect(result).toEqual(undefined)
  })
})
