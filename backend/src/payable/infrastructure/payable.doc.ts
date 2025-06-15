import { applyDecorators } from '@nestjs/common'
import { ApiResponse } from '@nestjs/swagger'
import { CreatePayableDto } from '../application/dtos/create.dto'

export function CreatePayableDoc() {
  return applyDecorators(
    ApiResponse({
      status: 201,
      description: 'Item created',
      type: CreatePayableDto,
    }),
    ApiResponse({
      status: 422,
      description: 'Invalid request body',
      schema: {
        example: {
          statusCode: 422,
          message: [],
          error: 'Unprocessable Entity',
        },
      },
    }),
  )
}
