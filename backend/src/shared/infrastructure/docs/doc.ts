import { applyDecorators } from '@nestjs/common'
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger'

const UnauthorizedResponse = ApiUnauthorizedResponse({
  description: 'Unauthorized',
  schema: {
    example: {
      message: 'Unauthorized',
      error: 'Unauthorized',
      statusCode: 401,
    },
  },
})

export function AuthorizedDoc() {
  return applyDecorators(ApiBearerAuth(), UnauthorizedResponse)
}
