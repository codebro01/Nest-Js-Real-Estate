import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';

interface ExtendedReq extends Request {
  user: {
    user_metadata: {
      custom_role: string;
    };
  };
}

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.getAllAndOverride<string[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!roles) return false; // no roles means close access

    const request = context.switchToHttp().getRequest<ExtendedReq>();
    const user = request.user;

    if (!user) throw new ForbiddenException('No user found');
    console.log(user)
    if (!roles.includes(user.user_metadata.custom_role)) {
      throw new ForbiddenException('Insufficient permissions');
    }

    return true;
  }
}
