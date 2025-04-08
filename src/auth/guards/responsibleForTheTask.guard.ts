import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { TaskService } from 'src/task/task.service';

@Injectable()
export class ResponsibleForTheTask implements CanActivate {
  constructor(private taskService: TaskService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { user, params } = context.switchToHttp().getRequest();
    const taskId = params.id;
    const userId = user._id.toString();

    const isResponsibleForTheTask =
      await this.taskService.isResponsibleForTheTask(taskId, userId);

    return isResponsibleForTheTask;
  }
}
