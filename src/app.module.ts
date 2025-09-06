import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { SupabaseModule } from '@src/supabase/supabase.module';
import { SupabaseProvider } from './supabase/supabase.provider';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { MulterService } from './multer/multer.service';
import { MulterModule } from './multer/multer.module';
import { UploadController } from './upload/upload.controller';
import { UploadModule } from './upload/upload.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // makes ConfigService available everywhere
    }),
    UserModule,
    AuthModule,
    SupabaseModule,
    JwtModule,
    CloudinaryModule,
    MulterModule,
    UploadModule,
  ],
  controllers: [AppController, UploadController],
  providers: [AppService, SupabaseProvider, MulterService],
})
export class AppModule {}
