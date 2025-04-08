import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';

export class UpdateTaskStatusDto extends PartialType(CreateTaskDto) {
    status?:boolean
}
