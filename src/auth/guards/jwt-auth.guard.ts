import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  Inject,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import { SupabaseClient } from '@supabase/supabase-js';
import { jwtConstants } from '@src/auth/jwtContants';
import { usersTable } from '@src/db';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { eq, sql } from 'drizzle-orm';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    @Inject('DB')
    private readonly DbProvider: NodePgDatabase<typeof import('@src/db/users')>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const response = context.switchToHttp().getResponse<Response>();

    const access_token =
      request.cookies?.access_token ||
      request.headers['authorization']?.split(' ')[1]; // for browser cookies // for mobile apps
    const refresh_token =
      request.cookies?.refresh_token ||
      request.headers['authorization']?.split(' ')[1]; // for browser cookies // for mobile apps

    if (!access_token && !refresh_token) {
      throw new UnauthorizedException('No token provided');
    }

    try {
      const token = await this.jwtService.verifyAsync(access_token, {
        secret: jwtConstants.accessTokenSecret,
      });
      if (!token)
        throw new UnauthorizedException(
          'Could not verify token, Unauthorization error',
        );

      // const payload = this.jwtService.verify(token); // verify with secret
      request['user'] = token; // attach user to request
      return true;
    } catch (error) {
      console.log(error);
      if (!refresh_token) {
        response.redirect('/signin');
        throw new UnauthorizedException(
          'Access token expired and no refresh token provided',
        );
      }
      const token = await this.jwtService.verifyAsync(refresh_token, {
        secret: jwtConstants.accessTokenSecret,
      });

      console.log(refresh_token, access_token);

      if (!token) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      const { email, id, role } = token;

      const newAccessToken = await this.jwtService.signAsync(
        { email, id, role },
        {
          secret: jwtConstants.accessTokenSecret,
        },
      );
      const newRefreshToken = await this.jwtService.signAsync(
        { email, id, role },
        {
          secret: jwtConstants.refreshTokenSecret,
        },
      );

      response.cookie('access_token', newAccessToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        maxAge: 1000 * 60 * 60, // 1h
      });
      response.cookie('refresh_token', newRefreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        maxAge: 1000 * 60 * 60 * 24 * 30, // 30d
      });

      const newTokenUser = await this.jwtService.verifyAsync(newAccessToken, {
        secret: jwtConstants.accessTokenSecret,
      });
      await this.DbProvider.update(usersTable)
        .set({ refreshToken: newRefreshToken })
        .where(eq(usersTable.id, id));
      if (!newTokenUser) {
        response.clearCookie('access_token');
        response.clearCookie('refresh_token');
        throw new UnauthorizedException('Token issue failed!!!');
      }
      console.log(newTokenUser);
      const tokenUser = newTokenUser || token
      // After verifying JWT in NestJS
    await this.DbProvider.execute(
      sql`SET app.current_user_role = ${tokenUser.role}`,
    );

      // const payload = this.jwtService.verify(token); // verify with secret
      request['user'] = newTokenUser; // attach user to request
      return true;
    }
  }
}
