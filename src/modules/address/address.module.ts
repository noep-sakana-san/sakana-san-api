import { UserModule } from './../user/user.module';
import {
  MiddlewareConsumer,
  Module,
  RequestMethod,
  forwardRef,
} from '@nestjs/common';
import { AddressService } from './address.service';
import { AddressController } from './address.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { Address } from './address.entity';
import { AuthMiddleware } from '../auth/auth.middleware';

@Module({
  imports: [
    TypeOrmModule.forFeature([Address]),
    forwardRef(() => AuthModule),
    forwardRef(() => UserModule),
  ],
  providers: [AddressService],
  controllers: [AddressController],
  exports: [AddressService],
})
export class AddressModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        { path: '/address', method: RequestMethod.DELETE },
        { path: '/address', method: RequestMethod.PATCH },
        { path: '/address', method: RequestMethod.POST },
        { path: '/address/*', method: RequestMethod.DELETE },
        { path: '/address/*', method: RequestMethod.PATCH },
        { path: '/address/*', method: RequestMethod.POST },
      );
  }
}
