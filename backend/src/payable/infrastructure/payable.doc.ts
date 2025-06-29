import { applyDecorators } from '@nestjs/common'
import { ApiParam, ApiResponse } from '@nestjs/swagger'
import { CreatePayableDto } from '../application/dtos/payable.create.dto'
import { PayableResponseDto } from './payable.response.dto'
import { AuthorizedDoc } from '@/shared/infrastructure/docs/doc'

export function CreatePayableDoc() {
  return applyDecorators(
    AuthorizedDoc(),
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
    AuthorizedDoc(),
    ApiParam({
      name: 'id',
      format: 'uuid',
    }),
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
    AuthorizedDoc(),
    ApiParam({
      name: 'id',
      format: 'uuid',
    }),
    ApiResponse({
      status: 200,
      description: 'Item updated',
      type: PayableResponseDto,
    }),
  )
}

export function DeletePayableDoc() {
  return applyDecorators(
    AuthorizedDoc(),
    ApiParam({
      name: 'id',
      format: 'uuid',
    }),
    ApiResponse({
      status: 200,
      description: 'Item deleted',
    }),
    ApiResponse({
      status: 404,
      description: 'Item not found',
    }),
  )
}

export function FindAllPayablesDoc() {
  return applyDecorators(
    AuthorizedDoc(),
    ApiResponse({
      status: 200,
      description: 'List of items',
      type: PayableResponseDto,
      isArray: true,
    }),
  )
}
