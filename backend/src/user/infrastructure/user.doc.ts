import { applyDecorators } from '@nestjs/common'
import { ApiParam, ApiResponse } from '@nestjs/swagger'
import { UserResponseDto } from './user.response.dto'

export function CreateUserDoc() {
  return applyDecorators(
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
    ApiParam({ name: 'id', format: 'uuid' }),
    ApiResponse({ status: 200, description: 'Item updated', type: UserResponseDto })
  )
}

export function DeleteUserDoc() {
  return applyDecorators(
    ApiParam({ name: 'id', format: 'uuid' }),
    ApiResponse({ status: 200, description: 'Item deleted' }),
    ApiResponse({ status: 404, description: 'Item not found' }),
  )
}
