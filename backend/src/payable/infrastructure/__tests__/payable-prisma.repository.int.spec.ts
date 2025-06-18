import { Test } from '@nestjs/testing'
import { PayablePrismaRepository } from '../payable-prisma.repository'
import { PrismaService } from '@/shared/infrastructure/database/prisma.service'
import { PayableEntity } from '@/payable/domain/payable.entity'
import { PayableDataBuilder } from '@/payable/domain/__tests__/payable.data-builder'
import { AssignorPrismaRepository } from '@/assignor/infrastructure/assignor-prisma.repository'
import { AssignorEntity } from '@/assignor/domain/assignor.entity'
import { AssignorDataBuilder } from '@/assignor/domain/__tests__/assignor.data-builder'

describe('PayablePrismaRepository integration tests', () => {
  let sut: PayablePrismaRepository
  let prisma: PrismaService
  let assignorRepository: AssignorPrismaRepository
  let assignorId: string

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [],
      providers: [
        PrismaService,
        PayablePrismaRepository,
        AssignorPrismaRepository,
      ],
    }).compile()

    sut = module.get<PayablePrismaRepository>(PayablePrismaRepository)
    prisma = module.get<PrismaService>(PrismaService)
    assignorRepository = module.get<AssignorPrismaRepository>(
      AssignorPrismaRepository,
    )

    // Create a test assignor to associate with payables
    const assignorEntity = await assignorRepository.create(
      new AssignorEntity(AssignorDataBuilder()),
    )
    assignorId = assignorEntity.props.id
  })

  afterAll(async () => {
    await prisma.payable.deleteMany({})
    await prisma.assignor.deleteMany({})
  })

  it('should be defined', () => {
    expect(sut).toBeDefined()
  })

  it(`should create a new payable`, async () => {
    const entity = new PayableEntity(PayableDataBuilder({ assignorId }))
    const created = await sut.create(entity)

    expect(created).toBeInstanceOf(PayableEntity)
    expect(created.props).toBeDefined()
  })

  it(`should find a payable by id`, async () => {
    const entity = new PayableEntity(PayableDataBuilder({ assignorId }))
    const created = await sut.create(entity)

    const found = await sut.findById(created.props.id)

    expect(found).toBeInstanceOf(PayableEntity)
    expect(found.props).toBeDefined()
  })

  it(`should return null when id does not exist`, async () => {
    const notFound = await sut.findById('non-existing-id')
    expect(notFound).toBeNull()
  })

  it(`should update a payable`, async () => {
    const entity = new PayableEntity(PayableDataBuilder({ assignorId }))
    const created = await sut.create(entity)

    const newData = new PayableEntity(
      PayableDataBuilder({
        id: created.props.id,
        value: 9999,
        assignorId,
      }),
    )
    const updated = await sut.update(newData)

    expect(updated).toBeInstanceOf(PayableEntity)
    expect(updated.props.value).toBe(9999)
  })

  it(`should delete a payable`, async () => {
    const entity = new PayableEntity(PayableDataBuilder({ assignorId }))
    const created = await sut.create(entity)

    await sut.delete(created.props.id)

    const found = await sut.findById(created.props.id)
    expect(found).toBeNull()
  })

  it(`should list payables`, async () => {
    await prisma.payable.deleteMany({})
    const entity = new PayableEntity(PayableDataBuilder({ assignorId }))
    await sut.create(entity)

    const result = await sut.findAll()

    expect(Array.isArray(result)).toBe(true)
    expect(result[0]).toBeInstanceOf(PayableEntity)
  })
})
