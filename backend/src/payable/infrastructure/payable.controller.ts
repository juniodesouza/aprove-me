import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common'
import {
  CreatePayableDoc,
  DeletePayableDoc,
  FindPayableByIdDoc,
  UpdatePayableDoc,
} from './payable.doc'
import { CreatePayableDto } from '../application/dtos/payable.create.dto'
import { CreatePayableUseCase } from '../application/usecases/payable.create.usecase'
import { PayablePresenter } from './payable.presenter'
import { FindPayableByIdUseCase } from '../application/usecases/payable.find-by-id.usecase'
import { UpdatePayableDto } from '../application/dtos/payable.update.dto'
import { UpdatePayableUseCase } from '../application/usecases/payable.update.usecase'
import { DeletePayableUseCase } from '../application/usecases/payable.delete.usecase'

@Controller('payable')
export class PayableController {
  constructor(
    private readonly createPayableUseCase: CreatePayableUseCase,
    private readonly findPayableByIdUseCase: FindPayableByIdUseCase,
    private readonly updatePayableUseCase: UpdatePayableUseCase,
    private readonly deletePayableUseCase: DeletePayableUseCase,
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

  @UpdatePayableDoc()
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePayableDto: UpdatePayableDto,
  ) {
    const updatedPayable = await this.updatePayableUseCase.execute({
      id,
      data: updatePayableDto,
    })
    return PayablePresenter.toHttp(updatedPayable)
  }

  @DeletePayableDoc()
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.deletePayableUseCase.execute(id)
  }
}
