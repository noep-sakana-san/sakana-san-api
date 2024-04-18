import {
  MiddlewareConsumer,
  Module,
  RequestMethod,
  forwardRef,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthMiddleware } from '../auth/auth.middleware';
import { AuthModule } from '../auth/auth.module';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { UserService } from './user.service';
import { PlaceModule } from '../place/place.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    forwardRef(() => AuthModule),
    forwardRef(() => PlaceModule),
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        { path: '/users', method: RequestMethod.DELETE },
        { path: '/users', method: RequestMethod.PATCH },
        { path: '/users', method: RequestMethod.POST },
        { path: '/users/*', method: RequestMethod.DELETE },
        { path: '/users/*', method: RequestMethod.PATCH },
        { path: '/users/*', method: RequestMethod.POST },
        { path: '/users/me', method: RequestMethod.GET },
      );
  }
}
