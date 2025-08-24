import { Controller } from '@nestjs/common';
import { AuthService } from '@src/auth/auth.service';
import { Post, Body } from '@nestjs/common';
import { LoginUserDto } from '@src/auth/dto/login-user.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}
    @Post('signin')
    async loginUser(@Body() body: LoginUserDto) {
        return await this.authService.loginUser(body);
    }
}
