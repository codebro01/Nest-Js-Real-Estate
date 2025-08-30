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

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    @Inject('SUPABASE_CLIENT') private supabase: SupabaseClient,
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
      const { data, error } = await this.supabase.auth.getUser(access_token);
      if (error) throw new UnauthorizedException(error.message);

      // const payload = this.jwtService.verify(token); // verify with secret
      request['user'] = data.user; // attach user to request
      return true;
    } catch (error) {
      // console.log(error);
      if (!refresh_token) {
        response.redirect('/signin')
        throw new UnauthorizedException(
          'Access token expired and no refresh token provided',
        );

      }
      const { data, error: refreshTokenError } =
        await this.supabase.auth.refreshSession({
          refresh_token,
        });

        console.log(refresh_token, access_token)

      if (refreshTokenError || !data.session) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      const newAccessToken = data.session.access_token;
      const newRefreshToken = data.session.refresh_token;

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

      const { data: userData, error: superbaseGetUserError } =
        await this.supabase.auth.getUser(newAccessToken);
      if (superbaseGetUserError) throw new UnauthorizedException(error.message);

      // const payload = this.jwtService.verify(token); // verify with secret
      request['user'] = userData.user; // attach user to request
      return true;
    }
  }
}
