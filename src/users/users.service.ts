import { Injectable } from '@nestjs/common';
import { UserRepository } from '@src/users/repository/user.repository';
import { UserType } from '@src/db/schema';
import { AuthRepository } from '@src/auth/repository/auth.repository';


@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository, private readonly authRepository: AuthRepository) {}


  async createUser(data: UserType & {password: string}): Promise<UserType> {
    return await this.userRepository.createUser(data);
  }

  async loginUser(data: {password: string, email: string}) {
      return await this.authRepository.loginUser(data);
  }
}
