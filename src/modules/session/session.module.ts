import {
  MiddlewareConsumer,
  Module,
  RequestMethod,
  forwardRef,
} from '@nestjs/common';
import { SessionService } from './session.service';
import { SessionController } from './session.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';
import { AuthModule } from '../auth/auth.module';
import { AuthMiddleware } from '../auth/auth.middleware';
import { PlaceModule } from '../place/place.module';
import { Session } from './session.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Session]),
    forwardRef(() => UserModule),
    forwardRef(() => AuthModule),
    forwardRef(() => PlaceModule),
  ],
  providers: [SessionService],
  controllers: [SessionController],
  exports: [SessionService],
})
export class SessionModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        { path: '/sessions', method: RequestMethod.DELETE },
        { path: '/sessions', method: RequestMethod.PATCH },
        { path: '/sessions', method: RequestMethod.POST },
        { path: '/sessions/*', method: RequestMethod.DELETE },
        { path: '/sessions/*', method: RequestMethod.PATCH },
        { path: '/sessions/*', method: RequestMethod.POST },
      );
  }
}
