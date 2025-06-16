import { Test } from '@nestjs/testing'
import { AssignorPrismaRepository } from '../assignor-prisma.repository'
import { PrismaService } from '@/shared/infrastructure/database/prisma.service'
import { AssignorEntity } from '@/assignor/domain/assignor.entity'
import { AssignorDataBuilder } from '@/assignor/domain/__tests__/assignor.data-builder'

describe('AssignorPrismaRepository integration tests', () => {
  let sut: AssignorPrismaRepository
  let prisma: PrismaService

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [],
      providers: [PrismaService, AssignorPrismaRepository],
    }).compile()

    sut = module.get<AssignorPrismaRepository>(AssignorPrismaRepository)
    prisma = module.get<PrismaService>(PrismaService)

    await prisma.assignor.deleteMany({})
  })

  it('should be defined', () => {
    expect(sut).toBeDefined()
  })

  it(`should create a new assignor`, async () => {
    const entity = new AssignorEntity(AssignorDataBuilder())
    const created = await sut.create(entity)

    expect(created).toBeInstanceOf(AssignorEntity)
    expect(created.props).toBeDefined()
  })

  it(`should finds a assignor by id`, async () => {
    const entity = new AssignorEntity(AssignorDataBuilder())
    const created = await sut.create(entity)

    const found = await sut.findById(created.props.id)

    expect(found).toBeInstanceOf(AssignorEntity)
    expect(created.props).toBeDefined()
  })

  it(`should return null when id does not exist`, async () => {
    const notFound = await sut.findById('non-existing-id')
    expect(notFound).toBeNull()
  })

  it(`should update an assignor`, async () => {
    const entity = new AssignorEntity(AssignorDataBuilder())
    const created = await sut.create(entity)

    const newData = new AssignorEntity(
      AssignorDataBuilder({
        id: created.props.id,
        name: 'Updated Name',
      }),
    )
    const updated = await sut.update(newData)

    expect(updated).toBeInstanceOf(AssignorEntity)
    expect(created.props).toBeDefined()
    expect(updated.props.name).toBe('Updated Name')
  })

  it(`should delete an assignor`, async () => {
    const entity = new AssignorEntity(AssignorDataBuilder())
    const created = await sut.create(entity)

    await sut.delete(created.props.id)

    const found = await sut.findById(created.props.id)
    expect(found).toBeNull()
  })

  it(`should find an assignor by document`, async () => {
    const entity = new AssignorEntity(AssignorDataBuilder())
    const created = await sut.create(entity)

    const found = await sut.findByDocument(created.props.document)

    expect(found).toBeInstanceOf(AssignorEntity)
    expect(found.props.document).toBe(created.props.document)
  })

  it(`should return null when document does not exist`, async () => {
    const notFound = await sut.findByDocument('non-existing-document')
    expect(notFound).toBeNull()
  })
})
