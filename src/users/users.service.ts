import { Injectable } from '@nestjs/common';
import { UserRepository } from '@src/users/repository/repository';
import { NewUser } from '@src/db/schema';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(data: {
    firstname: string;
    lastname: string;
    age: number;
    username: string;
    email: string;
  }): Promise<NewUser> {
    return await this.userRepository.createUser(data);
  }
}
