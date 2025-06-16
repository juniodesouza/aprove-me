import {
  BadRequestException,
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common'

/**
 * Handles common Prisma errors and maps them to appropriate HTTP exceptions.
 *
 * @param error The error thrown by a Prisma operation.
 * @throws Mapped NestJS HTTP exceptions or rethrows the original error if not Prisma-related.
 */
export function handlePrismaError(error: any): Error {
  if (error?.code && error?.name === 'PrismaClientKnownRequestError') {
    switch (error.code) {
      case 'P2002':
        if (Array.isArray(error.meta?.target)) {
          throw new ConflictException(
            `Unique constraint failed on field(s): ${error.meta.target.join(', ')}`,
          )
        }
        throw new ConflictException('Unique constraint violation')

      case 'P2025':
        throw new NotFoundException('Entity not found')

      case 'P2003':
        if (error.meta?.field_name) {
          throw new BadRequestException(
            `Foreign key constraint failed: ${error.meta.field_name}`,
          )
        }
        throw new BadRequestException('Foreign key constraint failed')

      case 'P2000':
        throw new BadRequestException('Value too long for field')

      case 'P2001':
        throw new NotFoundException(
          'Record not found with the specified condition',
        )

      default:
        throw new InternalServerErrorException(`Prisma error: ${error.message}`)
    }
  }

  throw error
}
