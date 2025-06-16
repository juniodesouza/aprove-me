import { PartialType } from '@nestjs/swagger'
import { CreateAssignorDto } from './assignor.create.dto'

export class UpdateAssignorDto extends PartialType(CreateAssignorDto) {}
