import { PrismaService } from '@/shared/infrastructure/database/prisma.service'
import { UserEntity } from '../domain/user.entity'
import { UserRepository } from '../domain/user.repository'
import { handlePrismaError } from '@/shared/infrastructure/database/handle-prisma-error'
import { Injectable } from '@nestjs/common'

@Injectable()
export class UserPrismaRepository implements UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(user: UserEntity): Promise<UserEntity> {
    try {
      const created = await this.prisma.user.create({
        data: {
          ...user.props,
        },
      })

      return new UserEntity(created)
    } catch (error) {
      handlePrismaError(error)
    }
  }

  async findById(id: string): Promise<UserEntity | null> {
    try {
      const found = await this.prisma.user.findUnique({ where: { id } })

      if (!found) return null

      return new UserEntity(found)
    } catch (error) {
      handlePrismaError(error)
    }
  }

  async update(user: UserEntity): Promise<UserEntity> {
    try {
      const updated = await this.prisma.user.update({
        where: { id: user.props.id },
        data: {
          ...user.props,
        },
      })

      return new UserEntity(updated)
    } catch (error) {
      handlePrismaError(error)
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.prisma.user.delete({ where: { id } })
    } catch (error) {
      handlePrismaError(error)
    }
  }

  async findByLogin(login: string): Promise<UserEntity | null> {
    try {
      const found = await this.prisma.user.findUnique({ where: { login } })

      if (!found) return null

      return new UserEntity(found)
    } catch (error) {
      handlePrismaError(error)
    }
  }
}
