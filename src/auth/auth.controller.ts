import {
  Controller,
  Post,
  Body,
  Res,
  HttpStatus,
  Get,
  Query,
} from '@nestjs/common';
import { AuthService } from '@src/auth/auth.service';
import { LoginUserDto } from '@src/auth/dto/login-user.dto';
import type { Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import qs from 'qs';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { UserService } from '@src/users/users.service';

@Controller('auth')
export class AuthController {
  private clientId = process.env.GOOGLE_CLIENT_ID;
  private redirectUri = 'http://localhost:3000/api/v1/auth/google/callback';
  constructor(
    private readonly authService: AuthService,
    private jwtService: JwtService,
    private readonly userService: UserService,
  ) {}
  @Post('signin')
  async loginUser(@Body() body: LoginUserDto, @Res() res: Response) {
    const { userSafe:user, accessToken, refreshToken } = await this.authService.loginUser(body);

   
    res.cookie('access_token', accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 1000 * 60 * 60, // 1h
    });
    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 1000 * 60 * 60 * 24 * 30, // 30d
    });

    res.status(HttpStatus.ACCEPTED).json({ user, accessToken, refreshToken });
  }

  @Get('google')
  googleLogin(@Res() res: Response) {
    const scope = ['openid', 'email', 'profile'].join(' ');

    const params = qs.stringify({
      client_id: this.clientId,
      redirect_uri: this.redirectUri,
      response_type: 'code', // this is key for server-side OAuth
      scope,
      access_type: 'offline', // so we get a refresh token
      prompt: 'consent', // ensures refresh token is returned every login
    });

    const googleUrl = `https://accounts.google.com/o/oauth2/v2/auth?${params}`;
    res.redirect(googleUrl);
  }

  @Get('google/callback')
  async googleCallback(@Query('code') code: string, @Res() res: Response) {
    const { data } = await axios.post(
      'https://oauth2.googleapis.com/token',
      qs.stringify({
        code,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: 'http://localhost:3000/api/v1/auth/google/callback',
        grant_type: 'authorization_code',
      }),
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } },
    );

    const { id_token } = data;

    const decoded: any = jwtDecode(id_token); // <-- note the .default

    //! generate a ramdon crypto password for google users
    const googleUserPwd = this.authService.generateRandomPassword();

    const { email, given_name, family_name, picture, email_verified } = decoded;
    const payload = {
      email,
      firstname: given_name,
      lastname: family_name,
      dp: picture,
      emailVerified: email_verified,
      password: googleUserPwd,
      authProvider: 'google',
    };
    const { user, refreshToken, accessToken } =
      await this.userService.createUser(payload);

    res.cookie('access_token', accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 1000 * 60 * 60, // 1h
    });
    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 1000 * 60 * 60 * 24 * 30, // 30d
    });

    res.status(HttpStatus.ACCEPTED).json({ user, accessToken, refreshToken });

    res.json({ user, refreshToken, accessToken });

    //! decode jwt

    // Generate your own JWT session for the user (like your email/password login)
    // const myAppToken = await this.jwtService.signAsync({ email: decoded.email, sub: decoded.sub }, {
    //   secret: jwtConstants.accessTokenSecret,
    //   expiresIn: '1h'
    // });

    // // Set cookies
    // res.cookie('access_token', myAppToken, {
    //   httpOnly: true,
    //   maxAge: expires_in * 1000,
    // });
    // if (refresh_token) {
    //   res.cookie('refresh_token', refresh_token, {
    //     httpOnly: true,
    //     maxAge: 30 * 24 * 60 * 60 * 1000,
    //   });
    // }

    // res.redirect('http://localhost:3000/dashboard'); // frontend route
  }
}

// @Get('callback')
// async googleCallback(@Res() res: Response) {
//   // After Google redirects back to you
//   // Supabase sets the session automatically in query/cookie
//   // For simplicity, you can just send success here
//   return res
//     .status(HttpStatus.OK)
//     .json({ message: 'Google login successful' });
// }
