import { applyDecorators } from '@nestjs/common'
import { ApiResponse } from '@nestjs/swagger'
import { CreatePayableDto } from '../application/dtos/payable.create.dto'
import { PayableResponseDto } from './payable.response.dto'

export function CreatePayableDoc() {
  return applyDecorators(
    ApiResponse({
      status: 201,
      description: 'Item created',
      type: PayableResponseDto,
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
