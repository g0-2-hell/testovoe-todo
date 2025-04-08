import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { AuthRequest, UserIdBody } from '../types/types';
import { UpdateTaskStatusDto } from './dto/update-status-task.dto';
import { OrGuard } from '@nest-lab/or-guard';
import { Role } from 'src/enums/role.enum';
import { Roles } from 'src/decorators/role.decorator';
import { UpdateDeadLineDto } from './dto/update-deadline-dto';
import { UpdateTaskProjectDto } from './dto/update-task-project-dto';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto, @Req() req: AuthRequest) {
    const userId = req.user._id.toString();
    return this.taskService.create(createTaskDto, userId);
  }

  @Get()
  findAll() {
    return this.taskService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.taskService.findOne(id);
  }

  @UseGuards(OrGuard(['ResponsibleForTheTask', 'AdminGuard']))
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.taskService.update(id, updateTaskDto);
  }

  @UseGuards(OrGuard(['ResponsibleForTheTask', 'AdminGuard']))
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taskService.remove(id);
  }

  @UseGuards(OrGuard(['ResponsibleForTheTask', 'AdminGuard']))
  @Patch(':id/status')
  updateStatus(
    @Param('id') id: string,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
  ) {
    return this.taskService.updateStatus(id, updateTaskStatusDto);
  }

  @Roles(Role.Admin)
  @Post(':id/responsible')
  addResponsible(@Param('id') id: string, @Body() userIdBody: UserIdBody) {
    return this.taskService.addResponsible(id, userIdBody.userId);
  }

  @Roles(Role.Admin)
  @Delete(':id/responsible')
  deleteResponsible(@Param('id') id: string, @Body() userIdBody: UserIdBody) {
    return this.taskService.removeResponsible(id, userIdBody.userId);
  }

  @Roles(Role.Admin)
  @Patch(':id/deadline')
  addDeadline(
    @Param('id') id: string,
    @Body() updateDeadLineDto: UpdateDeadLineDto,
  ) {
    return this.taskService.updateDeadLine(id, updateDeadLineDto);
  }

  @Roles(Role.Admin)
  @Patch(':id/project')
  changeProject(
    @Param('id') id: string,
    @Body() updateTaskProjectDto: UpdateTaskProjectDto,
  ) {
    return this.taskService.changeProject(id, updateTaskProjectDto);
  }
}
