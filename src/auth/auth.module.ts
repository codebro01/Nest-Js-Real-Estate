import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthRepository } from './repository/auth.repository';
import { DbModule } from '@src/db/db.module';
import { SupabaseModule } from '@src/supabase/supabase.module';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' }, // token expiry
    }),
    DbModule,
    SupabaseModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthRepository],
  exports: [AuthRepository, AuthService],
})
export class AuthModule {}
