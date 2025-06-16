import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common'
import { CreateUserUseCase } from '../application/usecases/user.create.usecase'
import { FindUserByIdUseCase } from '../application/usecases/user.find-by-id.usecase'
import { UpdateUserUseCase } from '../application/usecases/user.update.usecase'
import { DeleteUserUseCase } from '../application/usecases/user.delete.usecase'
import { CreateUserDto } from '../application/dtos/user.create.dto'
import {
  CreateUserDoc,
  DeleteUserDoc,
  FindUserByIdDoc,
  UpdateUserDoc,
} from './user.doc'
import { UserPresenter } from './user.presenter'
import { UpdateUserDto } from '../application/dtos/user.update.dto'

@Controller('user')
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly findUserByIdUseCase: FindUserByIdUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase,
  ) {}

  @CreateUserDoc()
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const createdUser = await this.createUserUseCase.execute(createUserDto)

    return UserPresenter.toHttp(createdUser)
  }

  @FindUserByIdDoc()
  @Get(':id')
  async findById(@Param('id') id: string) {
    const user = await this.findUserByIdUseCase.execute(id)
    return UserPresenter.toHttp(user)
  }

  @UpdateUserDoc()
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const updatedUser = await this.updateUserUseCase.execute({ id, data: updateUserDto })
    return UserPresenter.toHttp(updatedUser)
  }

  @DeleteUserDoc()
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.deleteUserUseCase.execute(id)
  }
}
