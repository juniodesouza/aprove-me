import { PartialType } from '@nestjs/swagger'
import { CreatePayableDto } from './payable.create.dto'

export class UpdatePayableDto extends PartialType(CreatePayableDto) {}
