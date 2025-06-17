import { applyDecorators } from '@nestjs/common'
import { ApiResponse } from '@nestjs/swagger'
import { AuthResponseDto } from './auth.response.dto'

export function LoginDoc() {
  return applyDecorators(
    ApiResponse({
      status: 200,
      description: 'Successful login',
      type: AuthResponseDto,
    }),
    ApiResponse({
      status: 401,
      description: 'Invalid credentials',
      schema: {
        example: {
          message: 'Invalid credentials',
          error: 'Unauthorized',
          statusCode: 401,
        },
      },
    }),
  )
}
