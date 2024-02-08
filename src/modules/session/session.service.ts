import { errorMessage } from '@/errors';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Session } from './session.entity';
import { PlaceService } from '../place/place.service';
import { CreateSessionApi, UpdateSessionApi } from '@/types/api/Session';
import { SessionDto } from '@/types/dto/Session';
import { sessionValidation } from '@/validations';

@Injectable()
export class SessionService {
  constructor(
    @InjectRepository(Session)
    private sessionRepository: Repository<Session>,
    private placeService: PlaceService,
  ) {}

  formatSession(session?: Session): SessionDto {
    if (!session) return;
    return {
      id: session.id,
      name: session.name ?? undefined,
      place: this.placeService.formatPlace(session.place),
      startDate: session.startDate,
      endDate: session.endDate,
      createdAt: session.createdAt,
      updatedAt: session.updatedAt,
    };
  }

  async getSessionById(_id: string): Promise<Session> {
    try {
      const session = await this.sessionRepository.findOneOrFail({
        where: [{ id: _id }],
        relations: ['place'],
      });
      return session;
    } catch (error) {
      throw new NotFoundException(errorMessage.api('session').NOT_FOUND, _id);
    }
  }

  async createSession(session: CreateSessionApi): Promise<Session> {
    try {
      const { placeId, ...rest } = session;
      await sessionValidation.create.validate(session);
      let place;
      if (placeId) {
        place = await this.placeService.getPlaceById(placeId);
        if (!place) {
          throw new NotFoundException(
            errorMessage.api('place').NOT_FOUND,
            placeId,
          );
        }
      }
      const { id } = await this.sessionRepository.save({ ...rest, place });
      return await this.getSessionById(id);
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error.message);
    }
  }

  async updateSession(session: UpdateSessionApi, id: string): Promise<Session> {
    try {
      await sessionValidation.update.validate(session);
      let place;
      if (session.placeId) {
        place = await this.placeService.getPlaceById(session.placeId);
        if (!place) {
          throw new BadRequestException(errorMessage.api('place').NOT_FOUND);
        }
      }

      await this.sessionRepository.update(id, {
        ...session,
        place,
      });
      return await this.getSessionById(id);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async deleteSession(id: string): Promise<void> {
    try {
      const session = await this.getSessionById(id);
      if (session.place) {
        await this.placeService.deletePlace(session.place.id);
      }
      await this.sessionRepository.delete(id);
    } catch (error) {
      console.log(error);
      throw new BadRequestException(
        errorMessage.api('session').NOT_DELETED,
        id,
      );
    }
  }
}
