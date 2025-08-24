import { Injectable, Inject } from '@nestjs/common';
import { usersTable, User, UserType } from '@src/db/schema';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class UserRepository {
  constructor(
    @Inject('DB')
    private DbProvider: NodePgDatabase<typeof import('@src/db/schema')>,
    @Inject('SUPABASE_CLIENT') private supabase: SupabaseClient,
  ) {}

  async createUser(data: UserType & { password: string }): Promise<User> {
    const { email, password, firstname, lastname, age, username } = data;

    // Step 1: create in Supabase Auth
    const { data: authData, error } = await this.supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      console.error('Supabase Auth Error:', error);
      throw new Error(
        `Supabase Auth Error: ${error.message} (Code: ${error.code})`,
      );
    }

    const userId = authData.user?.id; // Supabase Auth UUID

    // Step 2: create in your app DB
    const users = (await this.DbProvider.insert(usersTable)
      .values({
        id: userId, // link Supabase Auth user.id to your table
        firstname,
        lastname,
        age,
        username,
        email,
        // password,
      })
      .returning()) as User[];

    return users[0];
  }

  async getAllUsers(): Promise<User[]> {
    const users = await this.DbProvider.select().from(usersTable);

    return users;
  }
}
