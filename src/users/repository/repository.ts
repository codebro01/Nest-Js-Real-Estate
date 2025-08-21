import { Injectable, Inject } from '@nestjs/common';
import { usersTable, User, NewUser } from '@src/db/schema';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';

@Injectable()
export class UserRepository {
  constructor(
    @Inject('DB')
    private DbProvider: NodePgDatabase<typeof import('@src/db/schema')>,
  ) {}

  async createUser(data: {
    firstname: string;
    lastname: string;
    age: number;
    username: string;
    email: string;
  }): Promise<NewUser> {
    const users = (await this.DbProvider.insert(usersTable)
      .values(data)
      .returning()) as User[];
    return users[0];
  }
}
