import { Module } from '@nestjs/common';
import { UserController } from './users.controller';
import { UserService } from './users.service';
import { UserRepository } from '@src/users/repository/user.repository';
import { DbModule } from '@src/db/db.module';
import { JwtService } from '@nestjs/jwt';
import { SupabaseModule } from '@src/supabase/supabase.module';
import { SupabaseProvider } from '@src/supabase/supabase.provider';

@Module({
  imports: [DbModule, SupabaseModule],
  controllers: [UserController],
  providers: [UserService, UserRepository, JwtService, SupabaseProvider],
  exports: [UserRepository],
})
export class UserModule {}
