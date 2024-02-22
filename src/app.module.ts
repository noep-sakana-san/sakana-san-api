import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { ScheduleModule } from '@nestjs/schedule';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { FileUploadModule } from './modules/file-upload/file-upload.module';
import { MediaModule } from './modules/media/media.module';
import { UserModule } from './modules/user/user.module';
import { AddressModule } from './modules/address/address.module';
import { PlaceModule } from './modules/place/place.module';
import { SessionModule } from './modules/session/session.module';
import { TattooModule } from './modules/tattoo/tattoo.module';
import { FlashModule } from './modules/flash/flash.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.TYPEORM_HOST,
      port: Number(process.env.TYPEORM_PORT),
      username: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
      database: process.env.TYPEORM_DATABASE,
      entities: [join(__dirname, '**', '*.entity.{ts,js}')],
    }),
    MulterModule.register({
      dest: './public/files',
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '../public'),
    }),

    UserModule,
    AuthModule,
    FileUploadModule,
    MediaModule,
    AddressModule,
    PlaceModule,
    SessionModule,
    TattooModule,
    FlashModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
