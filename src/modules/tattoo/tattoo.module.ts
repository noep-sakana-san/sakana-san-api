import {
  MiddlewareConsumer,
  Module,
  RequestMethod,
  forwardRef,
} from '@nestjs/common';
import { TattooService } from './tattoo.service';
import { TattooController } from './tattoo.controller';
import { AuthMiddleware } from '../auth/auth.middleware';
import { Tattoo } from './tattoo.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';
import { PlaceModule } from '../place/place.module';
import { MediaModule } from '../media/media.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Tattoo]),
    forwardRef(() => UserModule),
    forwardRef(() => AuthModule),
    forwardRef(() => PlaceModule),
    forwardRef(() => MediaModule),
  ],
  providers: [TattooService],
  controllers: [TattooController],
  exports: [TattooService],
})
export class TattooModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        { path: '/tattoos', method: RequestMethod.DELETE },
        { path: '/tattoos', method: RequestMethod.PATCH },
        { path: '/tattoos', method: RequestMethod.POST },
        { path: '/tattoos/*', method: RequestMethod.DELETE },
        { path: '/tattoos/*', method: RequestMethod.PATCH },
        { path: '/tattoos/*', method: RequestMethod.POST },
      );
  }
}
