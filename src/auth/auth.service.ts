import { Injectable } from '@nestjs/common';
import { AuthRepository } from '@src/auth/repository/auth.repository';

@Injectable()
export class AuthService {
  constructor(private readonly authRepository: AuthRepository) {}

  async loginUser(data: { email: string; password: string }) {
    return this.authRepository.loginUser(data);
  }
}
