import { errorMessage } from '@/errors';
import { RegisterApi, UpdateUserApi, UserDto } from '@/types';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PlaceService } from '../place/place.service';
import { userValidation } from '@/validations';
import { Place } from '../place/place.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private placeService: PlaceService,
  ) {}

  formatUser(user: User): UserDto {
    if (!user) return;
    return {
      id: user.id,
      userName: user.username,
      paragraph1: user.paragraph1 ?? undefined,
      paragraph2: user.paragraph2 ?? undefined,
      place: user.place ? this.placeService.formatPlace(user.place) : undefined,
      email: user.email ?? undefined,
      phone: user.phone ?? undefined,
      instagram: user.instagram ?? undefined,
      facebook: user.facebook ?? undefined,
      updatedAt: user.updatedAt,
      createdAt: user.createdAt,
    };
  }

  async getOneById(_id: string): Promise<User> {
    try {
      const user = await this.userRepository.findOneOrFail({
        where: { id: _id },
        relations: ['place', 'place.address'],
      });
      return user;
    } catch (error) {
      throw new NotFoundException(errorMessage.api('user').NOT_FOUND, _id);
    }
  }

  async getOneByUsername(username: string): Promise<User> {
    return await this.userRepository.findOne({
      where: { username },
      relations: ['place', 'place.address'],
    });
  }

  async getUser(): Promise<User> {
    const users = await this.userRepository.find({
      take: 1,
      relations: ['place', 'place.address'],
    });
    return users[0];
  }

  async createUser(body: RegisterApi): Promise<User> {
    try {
      return await this.userRepository.save({
        ...body,
      });
    } catch (error) {
      console.log(error);
      throw new BadRequestException(errorMessage.api('user').NOT_CREATED);
    }
  }

  async updateUser(body: UpdateUserApi, id: string): Promise<User> {
    try {
      await userValidation.update.validate(body, {
        abortEarly: false,
      });
      const { placeId } = body;

      const user = await this.getOneById(id);
      if (!user)
        throw new BadRequestException(errorMessage.api('user').NOT_FOUND);

      let place: Place;
      if (placeId) {
        place = await this.placeService.getPlaceById(placeId);
      }
      const userUpdated = await this.userRepository.save({
        place,
        ...user,
        phone: body.phone ?? null,
        username: body.username ?? null,
        paragraph1: body.paragraph1 ?? null,
        paragraph2: body.paragraph2 ?? null,
        instagram: body.instagram ?? null,
        facebook: body.facebook ?? null,
        email: body.email ?? null,
      });
      return userUpdated;
    } catch (e) {
      console.log(e);
      throw new BadRequestException(e.errors);
    }
  }

  async deleteUser(id: string): Promise<void> {
    try {
      await this.userRepository.delete(id);
    } catch (error) {
      console.log(error);
      throw new BadRequestException(errorMessage.api('user').NOT_FOUND, id);
    }
  }
}
