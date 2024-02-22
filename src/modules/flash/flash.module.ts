import {
  MiddlewareConsumer,
  Module,
  RequestMethod,
  forwardRef,
} from '@nestjs/common';
import { FlashService } from './flash.service';
import { FlashController } from './flash.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { MediaModule } from '../media/media.module';
import { UserModule } from '../user/user.module';
import { AuthMiddleware } from '../auth/auth.middleware';
import { Flash } from './flash.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Flash]),
    forwardRef(() => UserModule),
    forwardRef(() => AuthModule),
    forwardRef(() => MediaModule),
  ],
  providers: [FlashService],
  controllers: [FlashController],
  exports: [FlashService],
})
export class FlashModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        { path: '/flashes', method: RequestMethod.DELETE },
        { path: '/flashes', method: RequestMethod.PATCH },
        { path: '/flashes', method: RequestMethod.POST },
        { path: '/flashes/*', method: RequestMethod.DELETE },
        { path: '/flashes/*', method: RequestMethod.PATCH },
        { path: '/flashes/*', method: RequestMethod.POST },
      );
  }
}
