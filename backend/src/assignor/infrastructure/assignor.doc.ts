import { applyDecorators } from '@nestjs/common'
import { ApiParam, ApiResponse } from '@nestjs/swagger'
import { AssignorResponseDto } from './assignor.response.dto'

export function CreateAssignorDoc() {
  return applyDecorators(
    ApiResponse({
      status: 201,
      description: 'Item created',
      type: AssignorResponseDto,
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

export function FindAssignorByIdDoc() {
  return applyDecorators(
    ApiParam({
      name: 'id',
      format: 'uuid',
    }),
    ApiResponse({
      status: 200,
      description: 'Item found',
      type: AssignorResponseDto,
    }),
    ApiResponse({
      status: 404,
      description: 'Item not found',
    }),
  )
}

export function UpdateAssignorDoc() {
  return applyDecorators(
    ApiParam({
      name: 'id',
      format: 'uuid',
    }),
    ApiResponse({
      status: 200,
      description: 'Item updated',
      type: AssignorResponseDto,
    }),
  )
}

export function DeleteAssignorDoc() {
  return applyDecorators(
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
