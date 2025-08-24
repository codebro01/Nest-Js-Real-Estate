import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { SupabaseModule } from '@src/supabase/supabase.module';
import { SupabaseProvider } from './supabase/supabase.provider';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // makes ConfigService available everywhere
    }),
    UserModule,
    AuthModule,
    SupabaseModule,
    JwtModule,
  ],
  controllers: [AppController],
  providers: [AppService, SupabaseProvider],
})
export class AppModule {}
