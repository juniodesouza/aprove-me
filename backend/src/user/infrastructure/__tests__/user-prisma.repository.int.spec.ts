import { Test } from '@nestjs/testing'
import { UserPrismaRepository } from '../user-prisma.repository'
import { PrismaService } from '@/shared/infrastructure/database/prisma.service'
import { UserEntity } from '@/user/domain/user.entity'
import { UserDataBuilder } from '@/user/domain/__tests__/user.data-builder'

describe('UserPrismaRepository integration tests', () => {
  let sut: UserPrismaRepository
  let prisma: PrismaService

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [PrismaService, UserPrismaRepository],
    }).compile()

    sut = module.get<UserPrismaRepository>(UserPrismaRepository)
    prisma = module.get<PrismaService>(PrismaService)

    await prisma.user.deleteMany({})
  })

  afterAll(async () => {
    await prisma.user.deleteMany({})
  })

  it('should be defined', () => {
    expect(sut).toBeDefined()
  })

  it(`should create a new user`, async () => {
    const entity = new UserEntity(UserDataBuilder())
    const created = await sut.create(entity)

    expect(created).toBeInstanceOf(UserEntity)
    expect(created.props).toBeDefined()
  })

  it(`should finds a user by id`, async () => {
    const entity = new UserEntity(UserDataBuilder())
    const created = await sut.create(entity)

    const found = await sut.findById(created.props.id)

    expect(found).toBeInstanceOf(UserEntity)
    expect(created.props).toBeDefined()
  })

  it(`should return null when id does not exist`, async () => {
    const notFound = await sut.findById('non-existing-id')
    expect(notFound).toBeNull()
  })

  it(`should update an user`, async () => {
    const entity = new UserEntity(UserDataBuilder())
    const created = await sut.create(entity)

    const newData = new UserEntity(
      UserDataBuilder({ id: created.props.id, login: 'updated@test.com' }),
    )
    const updated = await sut.update(newData)

    expect(updated).toBeInstanceOf(UserEntity)
    expect(created.props).toBeDefined()
    expect(updated.props.login).toBe('updated@test.com')
  })

  it(`should delete an user`, async () => {
    const entity = new UserEntity(UserDataBuilder())
    const created = await sut.create(entity)

    await sut.delete(created.props.id)

    const found = await sut.findById(created.props.id)
    expect(found).toBeNull()
  })

  it(`should find an user by login`, async () => {
    const entity = new UserEntity(UserDataBuilder())
    const created = await sut.create(entity)

    const found = await sut.findByLogin(created.props.login)

    expect(found).toBeInstanceOf(UserEntity)
    expect(found.props.login).toBe(created.props.login)
  })

  it(`should return null when login does not exist`, async () => {
    const notFound = await sut.findByLogin('non-existing-login')
    expect(notFound).toBeNull()
  })
})
