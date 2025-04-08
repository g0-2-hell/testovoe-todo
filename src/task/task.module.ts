import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Task, TaskSchema } from './task.schema';
import { ResponsibleForTheTask } from 'src/auth/guards/responsibleForTheTask.guard';
import { AdminGuard } from 'src/auth/guards/admin.guard';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }]),
  ],
  controllers: [TaskController],
  providers: [
    TaskService,
    { provide: 'ResponsibleForTheTask', useClass: ResponsibleForTheTask },
    { provide: 'AdminGuard', useClass: AdminGuard },
  ],
})
export class TaskModule {}
