import { Body, Controller, Post } from '@nestjs/common'
import { CreatePayableDoc } from './payable.doc'
import { CreatePayableDto } from '../application/dtos/create.dto'
import { CreatePayableUseCase } from '../application/usecases/create.usecase'
import { PayablePresenter } from './payable.presenter'

@Controller('payable')
export class PayableController {
  constructor(private readonly createPayableUseCase: CreatePayableUseCase) {}

  @CreatePayableDoc()
  @Post()
  async create(@Body() createPayableDto: CreatePayableDto) {
    const createdPayable =
      await this.createPayableUseCase.execute(createPayableDto)

    return PayablePresenter.toHttp(createdPayable)
  }
}
