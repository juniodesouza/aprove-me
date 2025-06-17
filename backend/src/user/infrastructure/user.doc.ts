import { applyDecorators } from '@nestjs/common'
import { ApiParam, ApiResponse } from '@nestjs/swagger'
import { UserResponseDto } from './user.response.dto'
import { AuthorizedDoc } from '@/shared/infrastructure/docs/doc'

export function CreateUserDoc() {
  return applyDecorators(
    AuthorizedDoc(),
    ApiResponse({
      status: 201,
      description: 'Item created',
      type: UserResponseDto,
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

export function FindUserByIdDoc() {
  return applyDecorators(
    AuthorizedDoc(),
    ApiParam({ name: 'id', format: 'uuid' }),
    ApiResponse({
      status: 200,
      description: 'Item found',
      type: UserResponseDto,
    }),
    ApiResponse({ status: 404, description: 'Item not found' }),
  )
}

export function UpdateUserDoc() {
  return applyDecorators(
    AuthorizedDoc(),
    ApiParam({ name: 'id', format: 'uuid' }),
    ApiResponse({
      status: 200,
      description: 'Item updated',
      type: UserResponseDto,
    }),
  )
}

export function DeleteUserDoc() {
  return applyDecorators(
    AuthorizedDoc(),
    ApiParam({ name: 'id', format: 'uuid' }),
    ApiResponse({ status: 200, description: 'Item deleted' }),
    ApiResponse({ status: 404, description: 'Item not found' }),
  )
}
