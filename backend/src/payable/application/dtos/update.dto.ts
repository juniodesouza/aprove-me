import { PartialType } from '@nestjs/swagger'
import { CreatePayableDto } from './create.dto'

export class UpdatePayableDto extends PartialType(CreatePayableDto) {}
