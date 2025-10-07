import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { META_ROLES } from '../decorators/role-protected.decorator';
import { User } from '../entity/user.entity';

@Injectable()
export class UserRoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const validRoles: string[] = this.reflector.get<string[]>(
      META_ROLES,
      context.getHandler(),
    );

    console.log('Required roles:', validRoles);

    if (!validRoles || validRoles.length === 0) {
      console.log('No roles required, access granted');
      return true;
    }

    const request = context.switchToHttp().getRequest<{ user: User }>();
    console.log('Request user:', request.user);

    const user = request.user;
    if (!user) {
      console.log('User not found in request');
      throw new BadRequestException('User not found');
    }

    console.log('User roles:', user.roles);
    for (const role of user.roles) {
      if (validRoles.includes(role)) {
        console.log('User has required role:', role);
        return true;
      }
    }

    console.log('User does not have required roles');
    throw new ForbiddenException('user does not have the required role');
  }
}
