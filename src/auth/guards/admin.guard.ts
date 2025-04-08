import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Role } from 'src/enums/role.enum';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    return Role.Admin === request.user.role;
  }
}