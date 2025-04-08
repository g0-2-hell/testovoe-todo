import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Task, TaskDocument } from './task.schema';
import { Model } from 'mongoose';
import { UpdateTaskStatusDto } from './dto/update-status-task.dto';
import { UpdateDeadLineDto } from './dto/update-deadline-dto';
import { UpdateProjectDto } from 'src/project/dto/update-project.dto';
import { UpdateTaskProjectDto } from './dto/update-task-project-dto';

@Injectable()
export class TaskService {
  constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) {}

  create(createTaskDto: CreateTaskDto, userId: string) {
    return this.taskModel.create({ ...createTaskDto, responsible: userId });
  }

  findAll() {
    return this.taskModel.find({});
  }

  findOne(_id: string) {
    return this.taskModel.find({ _id });
  }

  update(_id: string, updateTaskDto: UpdateTaskDto) {
    return this.taskModel.updateOne({ _id }, updateTaskDto );
  }

  updateDeadLine(_id: string, updateDeadLineDto: UpdateDeadLineDto) {
    return this.taskModel.updateOne({ _id }, updateDeadLineDto );
  }

  addResponsible(_id: string, userId: string) {
    return this.taskModel.updateOne(
      { _id },
      { $addToSet: { responsible: userId } },
    );
  }

  removeResponsible(_id: string, userId: string) {
    return this.taskModel.updateOne(
      { _id },
      { $pull: { responsible: userId } },
    );
  }

  changeProject(_id: string, updateTaskProjectDto: UpdateTaskProjectDto) {
    return this.taskModel.updateOne({ _id }, updateTaskProjectDto);
  }

  updateStatus(_id: string, updateTaskStatusDto: UpdateTaskStatusDto) {
    return this.taskModel.updateOne({ _id }, updateTaskStatusDto );
  }

  remove(_id: string) {
    return this.taskModel.updateOne({ _id }, { isDeleted: true });
  }

  async isResponsibleForTheTask(_id: string, userId: string) {
    const task = await this.taskModel.findOne({ _id, responsible: userId });
    if (!task) {
      return false;
    }
    return true;
  }
}
