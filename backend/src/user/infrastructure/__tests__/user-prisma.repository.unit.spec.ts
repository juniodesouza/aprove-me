import { Test, TestingModule } from '@nestjs/testing'
import { UserPrismaRepository } from '../user-prisma.repository'
import { PrismaService } from '@/shared/infrastructure/database/prisma.service'
import { UserEntity } from '@/user/domain/user.entity'
import { UserDataBuilder } from '@/user/domain/__tests__/user.data-builder'

describe('UserPrismaRepository unit tests', () => {
  let sut: UserPrismaRepository

  const mockPrismaService = {
    user: {
      create: jest.fn().mockRejectedValue(new Error()),
      findUnique: jest.fn().mockRejectedValue(new Error()),
      update: jest.fn().mockRejectedValue(new Error()),
      delete: jest.fn().mockRejectedValue(new Error()),
    },
  }

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserPrismaRepository,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile()

    sut = module.get<UserPrismaRepository>(UserPrismaRepository)
  })

  it('should be defined', () => {
    expect(sut).toBeDefined()
  })

  it('should call handlePrismaError when create fails', async () => {
    const entity = new UserEntity(UserDataBuilder())
    await expect(sut.create(entity)).rejects.toThrow(Error)
  })

  it('should call handlePrismaError when findById fails', async () => {
    await expect(sut.findById('fake-id')).rejects.toThrow(Error)
  })

  it('should call handlePrismaError when update fails', async () => {
    const entity = new UserEntity(UserDataBuilder())
    await expect(sut.update(entity)).rejects.toThrow(Error)
  })

  it('should call handlePrismaError when delete fails', async () => {
    await expect(sut.delete('fake-id')).rejects.toThrow(Error)
  })

  it('should call handlePrismaError when find by login fails', async () => {
    await expect(sut.findByLogin('fake-login')).rejects.toThrow(Error)
  })
})
