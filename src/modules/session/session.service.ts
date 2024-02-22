import { errorMessage } from '@/errors';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { Session } from './session.entity';
import { PlaceService } from '../place/place.service';
import {
  CreateSessionApi,
  SessionSearchParams,
  UpdateSessionApi,
} from '@/types/api/Session';
import { SessionDto } from '@/types/dto/Session';
import { sessionValidation } from '@/validations';
import { ApiSearchResponse } from '@/types';
import { searchByString } from '@/utils/search';
import { Place } from '../place/place.entity';

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
      isVisible: session.isVisible,
    };
  }

  searchCondition(
    searchParams?: SessionSearchParams,
  ): FindManyOptions<Session> {
    const relations = ['place', 'place.address'];

    if (!searchParams)
      return {
        relations,
      };

    const order = {
      [searchParams.orderBy ?? 'createdAt']: searchParams.orderType ?? 'DESC',
    };

    const where = {
      name: searchByString(searchParams?.search),
      isVisible: searchParams.isVisible,
      place: {
        id: searchParams.placeId,
      },
    };

    return {
      where,
      order,
      relations,
      skip: searchParams.page * searchParams.pageSize,
      take: searchParams.pageSize,
    };
  }

  async getSessionById(_id: string): Promise<Session> {
    try {
      const session = await this.sessionRepository.findOneOrFail({
        where: [{ id: _id }],
        relations: ['place', 'place.address'],
      });
      return session;
    } catch (error) {
      throw new NotFoundException(errorMessage.api('session').NOT_FOUND, _id);
    }
  }

  async getAllSessions(
    searchParams?: SessionSearchParams,
  ): Promise<ApiSearchResponse<Session>> {
    try {
      const [sessions, total] = await this.sessionRepository.findAndCount(
        this.searchCondition(searchParams),
      );
      return {
        items: sessions,
        total,
        page: searchParams.page,
      };
    } catch (error) {
      throw new NotFoundException(errorMessage.api('session').NOT_FOUND);
    }
  }

  async createSession(session: CreateSessionApi): Promise<Session> {
    try {
      const { placeId, ...rest } = session;
      await sessionValidation.create.validate(session, {
        abortEarly: false,
      });
      let place: Place;
      if (placeId) {
        place = await this.placeService.getPlaceById(placeId);
      }
      const { id } = await this.sessionRepository.save({ ...rest, place });
      return await this.getSessionById(id);
    } catch (e) {
      console.log(e);
      throw new BadRequestException(e.errors);
    }
  }

  async updateSession(session: UpdateSessionApi, id: string): Promise<Session> {
    try {
      await sessionValidation.update.validate(session, {
        abortEarly: false,
      });
      let place: Place;
      if (session.placeId) {
        place = await this.placeService.getPlaceById(session.placeId);
      }

      await this.sessionRepository.update(id, {
        ...session,
        place,
      });
      return await this.getSessionById(id);
    } catch (e) {
      throw new BadRequestException(e.errors);
    }
  }

  async deleteSession(id: string): Promise<void> {
    try {
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
