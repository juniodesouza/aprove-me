import { Test, TestingModule } from '@nestjs/testing'
import { AssignorPrismaRepository } from '../assignor-prisma.repository'
import { PrismaService } from '@/shared/infrastructure/database/prisma.service'
import { AssignorEntity } from '@/assignor/domain/assignor.entity'
import { AssignorDataBuilder } from '@/assignor/domain/__tests__/assignor.data-builder'

describe('AssignorPrismaRepository unit tests', () => {
  let sut: AssignorPrismaRepository

  let mockPrismaService = {
    assignor: {
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
        AssignorPrismaRepository,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile()

    sut = module.get<AssignorPrismaRepository>(AssignorPrismaRepository)
  })

  it('should be defined', () => {
    expect(sut).toBeDefined()
  })

  it('should call handlePrismaError when create fails', async () => {
    const entity = new AssignorEntity(AssignorDataBuilder())
    await expect(sut.create(entity)).rejects.toThrow(Error)
  })

  it('should call handlePrismaError when findById fails', async () => {
    await expect(sut.findById('fake-id')).rejects.toThrow(Error)
  })

  it('should call handlePrismaError when update fails', async () => {
    const entity = new AssignorEntity(AssignorDataBuilder())
    await expect(sut.update(entity)).rejects.toThrow(Error)
  })

  it('should call handlePrismaError when delete fails', async () => {
    await expect(sut.delete('fake-id')).rejects.toThrow(Error)
  })

  it('should call handlePrismaError when find by document fails', async () => {
    await expect(sut.findByDocument('fake-document')).rejects.toThrow(Error)
  })

  it('should call handlePrismaError when findAll fails', async () => {
    await expect(sut.findAll()).rejects.toThrow(Error)
  })
})
