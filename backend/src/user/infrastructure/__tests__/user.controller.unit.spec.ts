import { Test, TestingModule } from '@nestjs/testing'
import { plainToInstance } from 'class-transformer'
import { UserController } from '../user.controller'
import { CreateUserUseCase } from '@/user/application/usecases/user.create.usecase'
import { FindUserByIdUseCase } from '@/user/application/usecases/user.find-by-id.usecase'
import { UpdateUserUseCase } from '@/user/application/usecases/user.update.usecase'
import { DeleteUserUseCase } from '@/user/application/usecases/user.delete.usecase'
import { UserEntity } from '@/user/domain/user.entity'
import { UserDataBuilder } from '@/user/domain/__tests__/user.data-builder'
import { CreateUserDto } from '@/user/application/dtos/user.create.dto'
import { UserResponseDto } from '../user.response.dto'
import { UpdateUserDto } from '@/user/application/dtos/user.update.dto'

describe('UserController unit tests', () => {
  let sut: UserController
  let createUserUseCase: jest.Mocked<CreateUserUseCase>
  let findUserByIdUseCase: jest.Mocked<FindUserByIdUseCase>
  let updateUserUseCase: jest.Mocked<UpdateUserUseCase>
  let deleteUserUseCase: jest.Mocked<DeleteUserUseCase>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: CreateUserUseCase,
          useValue: { execute: jest.fn() },
        },
        {
          provide: FindUserByIdUseCase,
          useValue: { execute: jest.fn() },
        },
        {
          provide: UpdateUserUseCase,
          useValue: { execute: jest.fn() },
        },
        {
          provide: DeleteUserUseCase,
          useValue: { execute: jest.fn() },
        },
      ],
    }).compile()

    sut = module.get<UserController>(UserController)
    createUserUseCase = module.get(CreateUserUseCase)
    findUserByIdUseCase = module.get(FindUserByIdUseCase)
    updateUserUseCase = module.get(UpdateUserUseCase)
    deleteUserUseCase = module.get(DeleteUserUseCase)
  })

  it('should be defined', () => {
    expect(sut).toBeDefined()
  })

  it('should create a user successfully', async () => {
    const entity = new UserEntity(UserDataBuilder())

    createUserUseCase.execute.mockResolvedValue(entity)

    const createDto = plainToInstance(CreateUserDto, entity, { excludeExtraneousValues: true })

    const result = await sut.create(createDto)

    expect(createUserUseCase.execute).toHaveBeenCalledWith(createDto)
    expect(createUserUseCase.execute).toHaveBeenCalledTimes(1)
    expect(result).toBeInstanceOf(UserResponseDto)
  })

  it('should find a user by id successfully', async () => {
    const entity = new UserEntity(UserDataBuilder())

    findUserByIdUseCase.execute = jest.fn().mockResolvedValue(entity)

    const result = await sut.findById(entity.props.id)

    expect(findUserByIdUseCase.execute).toHaveBeenCalledWith(entity.props.id)
    expect(findUserByIdUseCase.execute).toHaveBeenCalledTimes(1)
    expect(result.id).toStrictEqual(entity.props.id)
    expect(result).toBeInstanceOf(UserResponseDto)
  })

  it('should update a user successfully', async () => {
    const entity = new UserEntity(UserDataBuilder())

    updateUserUseCase.execute.mockResolvedValue(entity)

    const updateDto = plainToInstance(UpdateUserDto, entity, { excludeExtraneousValues: true })

    const result = await sut.update(entity.props.id, updateDto)

    expect(updateUserUseCase.execute).toHaveBeenCalledWith({
      id: entity.props.id,
      data: updateDto,
    })
    expect(updateUserUseCase.execute).toHaveBeenCalledTimes(1)
    expect(result).toBeInstanceOf(UserResponseDto)
  })

  it('should delete a user successfully', async () => {
    const result = await sut.remove('fake-uuid')

    expect(deleteUserUseCase.execute).toHaveBeenCalledWith('fake-uuid')
    expect(deleteUserUseCase.execute).toHaveBeenCalledTimes(1)
    expect(result).toEqual(undefined)
  })
})
