import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { usersTable, UserType } from '@src/db/users';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { SupabaseClient } from '@supabase/supabase-js';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { eq } from 'drizzle-orm';
import { jwtConstants } from '@src/auth/jwtContants';
import { InternalServerErrorException } from '@nestjs/common';
// import { InternalServerErrorException } from '@nestjs/common';

@Injectable()
export class UserRepository {
  constructor(
    @Inject('DB')
    private DbProvider: NodePgDatabase<typeof import('@src/db')>,
    @Inject('SUPABASE_CLIENT') private supabase: SupabaseClient,
    private jwtService: JwtService,
  ) {
    this.DbProvider = DbProvider;
    this.supabase = supabase;
  }

  async createUser(
    data: Partial<UserType> & Pick<UserType, 'email' | 'password'>,
  ): Promise<any> {
    try {
      const { email, password } = data;
      if (!email || !password)
        throw new BadRequestException('Please email and password is required');
      const hashedPwd = await bcrypt.hash(password, 10);

      if (data.authProvider === 'google') {
        const [user] = await this.DbProvider.select()
          .from(usersTable)
          .where(eq(usersTable.email, email));
        if (user) {
          const payload = { id: user.id, email: user.email };

          const accessToken = await this.jwtService.signAsync(payload, {
            secret: jwtConstants.accessTokenSecret,
            expiresIn: '1h',
          });
          const refreshToken = await this.jwtService.signAsync(payload, {
            secret: jwtConstants.refreshTokenSecret,
            expiresIn: '30d',
          });

          const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);

          const updateUserToken = await this.DbProvider.update(usersTable)
            .set({ refreshToken: hashedRefreshToken })
            .where(eq(usersTable.id, user.id));

          if (!updateUserToken) throw new InternalServerErrorException();
          return { user, accessToken, refreshToken };
        }
      }

      const [user]: Partial<UserType>[] = (await this.DbProvider.insert(
        usersTable,
      )
        .values({
          ...data,
          password: hashedPwd,
        })
        .returning()) as UserType[];

      if (!user.id) throw new Error('User ID is missing');

      const payload = { id: user.id, email: user.email };

      const accessToken = await this.jwtService.signAsync(payload, {
        secret: jwtConstants.accessTokenSecret,
        expiresIn: '1h',
      });
      const refreshToken = await this.jwtService.signAsync(payload, {
        secret: jwtConstants.refreshTokenSecret,
        expiresIn: '30d',
      });

      const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);

      const updateUserToken = await this.DbProvider.update(usersTable)
        .set({ refreshToken: hashedRefreshToken })
        .where(eq(usersTable.id, user.id));

      if (!updateUserToken) throw new InternalServerErrorException();
      return { user, accessToken, refreshToken };
    } catch (dbError) {
      console.error('DB Insert Error:', dbError);

      // rollback Supabase user if DB fails

      throw dbError;
    }
  }

  async getAllUsers(): Promise<UserType[]> {
    const users = await this.DbProvider.select().from(usersTable);
    return users;
  }
}
