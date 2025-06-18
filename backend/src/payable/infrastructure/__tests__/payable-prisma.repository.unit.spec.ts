import { Test, TestingModule } from '@nestjs/testing'
import { PrismaService } from '@/shared/infrastructure/database/prisma.service'
import { PayablePrismaRepository } from '../payable-prisma.repository'
import { PayableEntity } from '@/payable/domain/payable.entity'
import { PayableDataBuilder } from '@/payable/domain/__tests__/payable.data-builder'

describe('PayablePrismaRepository unit tests', () => {
  let sut: PayablePrismaRepository

  let mockPrismaService = {
    payable: {
      create: jest.fn().mockRejectedValue(new Error()),
      findUnique: jest.fn().mockRejectedValue(new Error()),
      findMany: jest.fn().mockRejectedValue(new Error()),
      update: jest.fn().mockRejectedValue(new Error()),
      delete: jest.fn().mockRejectedValue(new Error()),
    },
  }

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        PayablePrismaRepository,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile()

    sut = module.get<PayablePrismaRepository>(PayablePrismaRepository)
  })

  it('should be defined', () => {
    expect(sut).toBeDefined()
  })

  it('should call handlePrismaError when create fails', async () => {
    const entity = new PayableEntity(PayableDataBuilder())
    await expect(sut.create(entity)).rejects.toThrow(Error)
  })

  it('should call handlePrismaError when findById fails', async () => {
    await expect(sut.findById('fake-id')).rejects.toThrow(Error)
  })

  it('should call handlePrismaError when update fails', async () => {
    const entity = new PayableEntity(PayableDataBuilder())
    await expect(sut.update(entity)).rejects.toThrow(Error)
  })

  it('should call handlePrismaError when delete fails', async () => {
    await expect(sut.delete('fake-id')).rejects.toThrow(Error)
  })

  it('should call handlePrismaError when findAll fails', async () => {
    await expect(sut.findAll()).rejects.toThrow(Error)
  })
})
