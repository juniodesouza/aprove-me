import { PrismaService } from '@/shared/infrastructure/database/prisma.service'
import { AssignorEntity } from '../domain/assignor.entity'
import { AssignorRepository } from '../domain/assignor.repository'
import { handlePrismaError } from '@/shared/infrastructure/database/handle-prisma-error'

export class AssignorPrismaRepository implements AssignorRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(assignor: AssignorEntity): Promise<AssignorEntity> {
    try {
      const created = await this.prisma.assignor.create({
        data: {
          ...assignor.props,
        },
      })

      return new AssignorEntity(created)
    } catch (error) {
      handlePrismaError(error)
    }
  }

  async findById(id: string): Promise<AssignorEntity | null> {
    try {
      const found = await this.prisma.assignor.findUnique({ where: { id } })

      if (!found) return null

      return new AssignorEntity(found)
    } catch (error) {
      handlePrismaError(error)
    }
  }

  async update(assignor: AssignorEntity): Promise<AssignorEntity> {
    try {
      const updated = await this.prisma.assignor.update({
        where: { id: assignor.props.id },
        data: {
          ...assignor.props,
        },
      })

      return new AssignorEntity(updated)
    } catch (error) {
      handlePrismaError(error)
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.prisma.assignor.delete({
        where: { id },
      })
    } catch (error) {
      handlePrismaError(error)
    }
  }
}
