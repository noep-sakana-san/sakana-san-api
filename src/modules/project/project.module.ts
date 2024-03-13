import {
  MiddlewareConsumer,
  Module,
  RequestMethod,
  forwardRef,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { AuthMiddleware } from '../auth/auth.middleware';
import { Project } from './project.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';
import { PlaceModule } from '../place/place.module';
import { MediaModule } from '../media/media.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Project]),
    forwardRef(() => UserModule),
    forwardRef(() => AuthModule),
    forwardRef(() => PlaceModule),
    forwardRef(() => MediaModule),
  ],
  providers: [ProjectService],
  controllers: [ProjectController],
  exports: [ProjectService],
})
export class ProjectModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        { path: '/projects', method: RequestMethod.DELETE },
        { path: '/projects', method: RequestMethod.PATCH },
        { path: '/projects', method: RequestMethod.POST },
        { path: '/projects/*', method: RequestMethod.DELETE },
        { path: '/projects/*', method: RequestMethod.PATCH },
        { path: '/projects/*', method: RequestMethod.POST },
      );
  }
}
