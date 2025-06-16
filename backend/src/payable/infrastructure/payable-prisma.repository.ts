import { PrismaService } from '@/shared/infrastructure/database/prisma.service'
import { handlePrismaError } from '@/shared/infrastructure/database/handle-prisma-error'
import { PayableEntity } from '../domain/payable.entity'
import { PayableRepository } from '../domain/payable.repository'
import { Injectable } from '@nestjs/common'

@Injectable()
export class PayablePrismaRepository implements PayableRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(payable: PayableEntity): Promise<PayableEntity> {
    try {
      const created = await this.prisma.payable.create({
        data: {
          ...payable.props,
        },
      })

      return new PayableEntity(created)
    } catch (error) {
      handlePrismaError(error)
    }
  }

  async findById(id: string): Promise<PayableEntity | null> {
    try {
      const found = await this.prisma.payable.findUnique({ where: { id } })

      if (!found) return null

      return new PayableEntity(found)
    } catch (error) {
      handlePrismaError(error)
    }
  }

  async update(payable: PayableEntity): Promise<PayableEntity> {
    try {
      const updated = await this.prisma.payable.update({
        where: { id: payable.props.id },
        data: {
          ...payable.props,
        },
      })

      return new PayableEntity(updated)
    } catch (error) {
      handlePrismaError(error)
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.prisma.payable.delete({
        where: { id },
      })
    } catch (error) {
      handlePrismaError(error)
    }
  }
}
