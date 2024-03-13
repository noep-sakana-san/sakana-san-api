import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { MediaService } from '../media/media.service';
import { PlaceService } from '../place/place.service';
import { Tattoo } from './tattoo.entity';
import {
  ApiSearchResponse,
  CreateTattooApi,
  TattooDto,
  TattooSearchParams,
  UpdateTattooApi,
} from '@/types';
import { searchByString } from '@/utils/search';
import { errorMessage } from '@/errors';
import { tattooValidation } from '@/validations';
import { Media } from '../media/media.entity';
import { Place } from '../place/place.entity';

@Injectable()
export class TattooService {
  constructor(
    @InjectRepository(Tattoo)
    private tattooRepository: Repository<Tattoo>,
    private mediaService: MediaService,
    private placeService: PlaceService,
  ) {}

  formatTattoo(tattoo?: Tattoo): TattooDto {
    if (!tattoo) return;
    return {
      id: tattoo.id,
      date: tattoo.date,
      images: tattoo.images.map((image) =>
        this.mediaService.formatMedia(image),
      ),
      isVisible: tattoo.isVisible,
      isFavorite: tattoo.isFavorite,
      title: tattoo.title,
      description: tattoo.description,
      healeds: tattoo.healeds?.map((image) =>
        this.mediaService.formatMedia(image),
      ),
      place: this.placeService.formatPlace(tattoo.place),
      createdAt: tattoo.createdAt,
      updatedAt: tattoo.updatedAt,
    };
  }

  searchCondition(searchParams?: TattooSearchParams): FindManyOptions<Tattoo> {
    const relations = ['images', 'healeds', 'place', 'place.address'];

    if (!searchParams)
      return {
        relations,
      };

    const order = {
      [searchParams.orderBy ?? 'createdAt']: searchParams.orderType ?? 'DESC',
    };

    const where = {
      title: searchByString(searchParams?.search),
      isVisible: searchParams.isVisible,
      isFavorite: searchParams.isFavorite,
      place: {
        id: searchParams.placeId,
      },
    };

    return {
      relations,
      order,
      where,
      skip: searchParams.page * searchParams.pageSize,
      take: searchParams.pageSize,
    };
  }

  async getTattooById(_id: string): Promise<Tattoo> {
    try {
      const tattoo = await this.tattooRepository.findOneOrFail({
        where: [{ id: _id }],
        relations: ['images', 'healeds', 'place', 'place.address'],
      });

      return tattoo;
    } catch (error) {
      throw new NotFoundException(errorMessage.api('tattoo').NOT_FOUND, _id);
    }
  }

  async getAllTattoos(
    searchParams?: TattooSearchParams,
  ): Promise<ApiSearchResponse<Tattoo>> {
    try {
      const [tattoos, total] = await this.tattooRepository.findAndCount(
        this.searchCondition(searchParams),
      );
      return {
        items: tattoos,
        total,
        page: searchParams.page,
      };
    } catch (error) {
      throw new NotFoundException(errorMessage.api('tattoo').NOT_FOUND);
    }
  }

  async createTattoo(data: CreateTattooApi): Promise<Tattoo> {
    try {
      await tattooValidation.create.validate(data, {
        abortEarly: false,
      });
      const { imageIds, healedIds, placeId, ...tattooData } = data;
      let images: Media[];
      if (imageIds) {
        images = await Promise.all(
          imageIds.map((imageId) => this.mediaService.getMediaById(imageId)),
        );
      }
      let healeds: Media[];
      if (healedIds) {
        healeds = await Promise.all(
          healedIds.map((imageId) => this.mediaService.getMediaById(imageId)),
        );
      }
      let place: Place;
      if (placeId) {
        place = await this.placeService.getPlaceById(placeId);
      }
      const { id } = await this.tattooRepository.save({
        ...tattooData,
        images,
        healeds,
        place,
      });
      return await this.getTattooById(id);
    } catch (e) {
      console.log(e);
      throw new BadRequestException(e.errors);
    }
  }

  async updateTattoo(data: UpdateTattooApi, id: string): Promise<Tattoo> {
    try {
      const { imageIds, healedIds, placeId, ...tattooData } = data;

      await tattooValidation.update.validate(data, {
        abortEarly: false,
      });
      const tattoo = await this.getTattooById(id);
      let images: Media[];
      if (imageIds) {
        await Promise.all(
          tattoo.images.map((image) => this.mediaService.deleteMedia(image.id)),
        );
        images = await Promise.all(
          imageIds.map((imageId) => this.mediaService.getMediaById(imageId)),
        );
      }
      let healeds: Media[];
      if (healedIds) {
        await Promise.all(
          tattoo.healeds.map((image) =>
            this.mediaService.deleteMedia(image.id),
          ),
        );
        healeds = await Promise.all(
          healedIds.map((imageId) => this.mediaService.getMediaById(imageId)),
        );
      }
      let place: Place;
      if (placeId) {
        place = await this.placeService.getPlaceById(placeId);
      }

      await this.tattooRepository.save({
        ...tattoo,
        ...tattooData,
        images,
        healeds,
        place,
      });
      return await this.getTattooById(id);
    } catch (e) {
      console.log(e);
      throw new BadRequestException(e.errors);
    }
  }

  async deleteTattoo(id: string): Promise<void> {
    try {
      const tattoo = await this.getTattooById(id);
      if (tattoo.images) {
        await Promise.all(
          tattoo.images.map((image) => this.mediaService.deleteMedia(image.id)),
        );
      }
      if (tattoo.healeds) {
        await Promise.all(
          tattoo.healeds.map((image) =>
            this.mediaService.deleteMedia(image.id),
          ),
        );
      }
      await this.tattooRepository.delete(id);
    } catch (error) {
      throw new NotFoundException(errorMessage.api('tattoo').NOT_DELETED, id);
    }
  }
}
