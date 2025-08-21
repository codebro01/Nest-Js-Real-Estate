import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from '@src/users/users.service';

@Controller('/api/v1/users')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Post()
  createUser(@Body() body: any) {
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
