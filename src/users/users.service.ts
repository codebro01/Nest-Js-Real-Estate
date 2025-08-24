import { Injectable } from '@nestjs/common';
import { UserRepository } from '@src/users/repository/user.repository';
import { UserType } from '@src/db/schema';


@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}


  async createUser(data: UserType & {password: string}): Promise<UserType> {
    return await this.userRepository.createUser(data);
  }
}
