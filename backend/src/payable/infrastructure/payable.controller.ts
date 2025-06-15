import { Body, Controller, Post } from '@nestjs/common'
import { CreatePayableDto } from '../application/dtos/create.dto'
import { instanceToPlain } from 'class-transformer'
import { CreatePayableDoc } from './payable.doc'

@Controller('payable')
export class PayableController {
  constructor() {}

  @CreatePayableDoc()
  @Post()
  async create(@Body() createPayableDto: CreatePayableDto) {
    return instanceToPlain(createPayableDto)
  }
}
