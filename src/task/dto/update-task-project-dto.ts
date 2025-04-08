import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';

export class UpdateTaskProjectDto extends PartialType(CreateTaskDto) {
  project?: string;
}