import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UserService } from '@src/users/users.service';
import { JwtAuthGuard } from '@src/auth/guards/jwt-auth.guard';
import { CreateUserDto } from '@src/users/dto/create-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Post('signup')
  // @UseGuards(JwtAuthGuard)
  createUser(@Body() body: CreateUserDto) {
    console.log(body);
    return this.usersService.createUser(body);
  }
  

  //   @Get()
  //   getAllUsers() {
  //     return this.usersService.getAllUsers();
  //   }

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
