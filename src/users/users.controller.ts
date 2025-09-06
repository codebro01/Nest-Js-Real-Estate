import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  Res, 
  HttpStatus
} from '@nestjs/common';
import { UserService } from '@src/users/users.service';
import { JwtAuthGuard } from '@src/auth/guards/jwt-auth.guard';
import { CreateUserDto } from '@src/users/dto/create-user.dto';
import { RolesGuard } from '@src/auth/guards/roles.guard';
import { Roles } from '@src/auth/decorators/roles.decorators';
import type { Response } from 'express';

@Controller('users')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Post('signup')
  // @UseGuards(JwtAuthGuard)
  async createUser(@Body() body: CreateUserDto, @Res() res: Response) {

    const {user, accessToken, refreshToken} = await this.usersService.createUser(body);

    console.log('authuser', user)
      
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
  async updateUser(@Body() body: CreateUserDto, @Res() res: Response) {

    const {authData, error} = await this.usersService.createUser(body);

    console.log('authData and error', error, authData)
        if (error || !authData?.session) {
          return res
            .status(HttpStatus.UNAUTHORIZED)
            .json({ message: 'Error creating user, Please try again' });
        }
        const { session, user } = authData;
        res.cookie('access_token', session.access_token, {
          httpOnly: true,
          secure: true,
          sameSite: 'strict',
          maxAge: 1000 * 60 * 60, // 1h
        });
        res.cookie('refresh_token', session.refresh_token, {
          httpOnly: true,
          secure: true,
          sameSite: 'strict',
          maxAge: 1000 * 60 * 60 * 24 * 30, // 30d
        });
    
        res.status(HttpStatus.ACCEPTED).json({ user, session });
  
  }




  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Get('get-all-users')
  getAllUsers() {
    return this.usersService.getAllUsers();
  }

  //   @Get(':id')
  //   getUserById(@Param('id') id: string) {
  //     return this.usersService.getUserById(id);
  //   }

  //   @Put(':id')
  //   updateUser(@Param('id') id: string, @Body() body: any) {
  //     return this.usersService.updateUser(id, body);
  //   }

  //   @Delete(':id')
  //   deleteUser(@Param('id') id: string) {
  //     return this.usersService.deleteUser(id);
  //   }
}
