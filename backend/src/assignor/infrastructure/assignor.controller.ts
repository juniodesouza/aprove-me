import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common'
import { CreateAssignorUseCase } from '../application/usecases/assignor.create.usecase'
import { FindAssignorByIdUseCase } from '../application/usecases/assignor.find-by-id.usecase'
import { UpdateAssignorUseCase } from '../application/usecases/assignor.update.usecase'
import { DeleteAssignorUseCase } from '../application/usecases/assignor.delete.usecase'
import { FindAllAssignorsUseCase } from '../application/usecases/assignor.find-all.usecase'
import { CreateAssignorDto } from '../application/dtos/assignor.create.dto'
import {
  CreateAssignorDoc,
  DeleteAssignorDoc,
  FindAllAssignorsDoc,
  FindAssignorByIdDoc,
  UpdateAssignorDoc,
} from './assignor.doc'
import { AssignorPresenter } from './assignor.presenter'
import { UpdateAssignorDto } from '../application/dtos/assignor.update.dto'

@Controller('assignor')
export class AssignorController {
  constructor(
    private readonly createAssignorUseCase: CreateAssignorUseCase,
    private readonly findAssignorByIdUseCase: FindAssignorByIdUseCase,
    private readonly findAllAssignorsUseCase: FindAllAssignorsUseCase,
    private readonly updateAssignorUseCase: UpdateAssignorUseCase,
    private readonly deleteAssignorUseCase: DeleteAssignorUseCase,
  ) {}

  @CreateAssignorDoc()
  @Post()
  async create(@Body() createAssignorDto: CreateAssignorDto) {
    const createdAssignor =
      await this.createAssignorUseCase.execute(createAssignorDto)

    return AssignorPresenter.toHttp(createdAssignor)
  }

  @FindAllAssignorsDoc()
  @Get()
  async findAll() {
    const assignors = await this.findAllAssignorsUseCase.execute()
    return assignors.map((a) => AssignorPresenter.toHttp(a))
  }

  @FindAssignorByIdDoc()
  @Get(':id')
  async findById(@Param('id') id: string) {
    const assignor = await this.findAssignorByIdUseCase.execute(id)
    return AssignorPresenter.toHttp(assignor)
  }

  @UpdateAssignorDoc()
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAssignorDto: UpdateAssignorDto,
  ) {
    const updatedAssignor = await this.updateAssignorUseCase.execute({
      id,
      data: updateAssignorDto,
    })
    return AssignorPresenter.toHttp(updatedAssignor)
  }

  @DeleteAssignorDoc()
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.deleteAssignorUseCase.execute(id)
  }
}
