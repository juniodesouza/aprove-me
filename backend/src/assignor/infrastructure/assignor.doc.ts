import { applyDecorators } from '@nestjs/common'
import { ApiParam, ApiResponse } from '@nestjs/swagger'
import { AssignorResponseDto } from './assignor.response.dto'
import { AuthorizedDoc } from '@/shared/infrastructure/docs/doc'

export function CreateAssignorDoc() {
  return applyDecorators(
    AuthorizedDoc(),
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
    AuthorizedDoc(),
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
    AuthorizedDoc(),
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
