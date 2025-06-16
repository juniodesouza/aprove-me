import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { CreatePayableDoc, FindPayableByIdDoc } from './payable.doc'
import { CreatePayableDto } from '../application/dtos/payable.create.dto'
import { CreatePayableUseCase } from '../application/usecases/payable.create.usecase'
import { PayablePresenter } from './payable.presenter'
import { FindPayableByIdUseCase } from '../application/usecases/payable.find-by-id.usecase'

@Controller('payable')
export class PayableController {
  constructor(
    private readonly createPayableUseCase: CreatePayableUseCase,
    private readonly findPayableByIdUseCase: FindPayableByIdUseCase,
  ) {}

  @CreatePayableDoc()
  @Post()
  async create(@Body() createPayableDto: CreatePayableDto) {
    const createdPayable =
      await this.createPayableUseCase.execute(createPayableDto)

    return PayablePresenter.toHttp(createdPayable)
  }

  @FindPayableByIdDoc()
  @Get(':id')
  async findById(@Param('id') id: string) {
    const payable = await this.findPayableByIdUseCase.execute(id)
    return PayablePresenter.toHttp(payable)
  }
}
