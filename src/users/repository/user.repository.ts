import { Injectable, Inject } from '@nestjs/common';
import { usersTable, User, UserType } from '@src/db/users';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { SupabaseClient } from '@supabase/supabase-js';
// import { InternalServerErrorException } from '@nestjs/common';

@Injectable()
export class UserRepository {
  constructor(
    @Inject('DB')
    private DbProvider: NodePgDatabase<typeof import('@src/db')>,
    @Inject('SUPABASE_CLIENT') private supabase: SupabaseClient,
  ) {}

  async createUser(data: UserType & { password: string }): Promise<any> {
    const {
      email,
      password,
      firstname,
      lastname,
      dateOfBirth,
      username,
      role,
    } = data;

    // Step 1: create in Supabase Auth
    const { data: authData, error } = await this.supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          custom_role: role,
        },
      },
    });

    if (error) {
      console.error('Supabase Auth Error:', error);
      throw new Error(
        `Supabase Auth Error: ${error.message} (Code: ${error.code})`,
      );
    }

    const userId = authData.user?.id; // Supabase Auth UUID

    // Step 2: create in your app DB

    try {
      (await this.DbProvider.insert(usersTable)
        .values({
          id: userId, // link Supabase Auth user.id to your table
          firstname,
          lastname,
          dateOfBirth,
          username,
          email,
          role,
          // password,
        })
        .returning()) as User[];

      return { authData, error };
    } catch (error) {
      if (userId) {
        await this.supabase.auth.admin.deleteUser(userId);
      }

      console.log(error);
    }
  }

  async getAllUsers(): Promise<User[]> {
    const users = await this.DbProvider.select().from(usersTable);
    return users;
  }
}
