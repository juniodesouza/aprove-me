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

export function FindPayableByIdDoc() {
  return applyDecorators(
    ApiResponse({
      status: 200,
      description: 'Item found',
      type: PayableResponseDto,
    }),
    ApiResponse({
      status: 404,
      description: 'Item not found',
    }),
  )
}

export function UpdatePayableDoc() {
  return applyDecorators(
    ApiResponse({
      status: 200,
      description: 'Item updated',
      type: PayableResponseDto,
    }),
  )
}
