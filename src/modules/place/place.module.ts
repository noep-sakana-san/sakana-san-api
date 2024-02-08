import {
  MiddlewareConsumer,
  Module,
  RequestMethod,
  forwardRef,
} from '@nestjs/common';
import { PlaceService } from './place.service';
import { PlaceController } from './place.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { Place } from './place.entity';
import { AuthMiddleware } from '../auth/auth.middleware';
import { AddressModule } from '../address/address.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Place]),
    forwardRef(() => UserModule),
    forwardRef(() => AuthModule),
    forwardRef(() => AddressModule),
  ],
  providers: [PlaceService],
  controllers: [PlaceController],
  exports: [PlaceService],
})
export class PlaceModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        { path: '/place', method: RequestMethod.ALL },
        { path: '/place/*', method: RequestMethod.ALL },
      );
  }
}
