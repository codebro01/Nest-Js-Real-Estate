import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { usersTable } from '@src/db';
import { SupabaseClient } from '@supabase/supabase-js';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcrypt';
import { jwtConstants } from '../jwtContants';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthRepository {
  constructor(
    @Inject('DB')
    private readonly DbProvider: NodePgDatabase<typeof import('@src/db/users')>,
    @Inject('SUPABASE_CLIENT') private readonly supabase: SupabaseClient,
    private readonly jwtService: JwtService,
  ) {}
  async loginUser(data: { email: string; password: string }) {
    const { email, password } = data;

    if (!email || !password)
      throw new BadRequestException('Please provide email and password');
    const [user] = await this.DbProvider.select()
      .from(usersTable)
      .where(eq(usersTable.email, email));
    if (!user)
      throw new UnauthorizedException(
        'Bad credentials, Please check email and password',
      );
    const passwordIsCorrect = await bcrypt.compare(password, user.password);
    if (!passwordIsCorrect)
      throw new UnauthorizedException(
        'Bad credentials, Please check email and password',
      );

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
    const { password:pwd, ...userSafe } = user;
    return { userSafe, accessToken, refreshToken };
  }

  async handleGoogleCallback(code: string) {
    // Step 2: exchange the code Google gave us for a Supabase session
    return await this.supabase.auth.exchangeCodeForSession(code);
  }
}
