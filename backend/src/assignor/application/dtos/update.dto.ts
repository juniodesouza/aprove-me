import { PartialType } from '@nestjs/swagger'
import { CreateAssignorDto } from './create.dto'

export class UpdateAssignorDto extends PartialType(CreateAssignorDto) {}
