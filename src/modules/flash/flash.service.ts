import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { MediaService } from '../media/media.service';
import { Flash } from './flash.entity';
import {
  ApiSearchResponse,
  CreateFlashApi,
  FlashDto,
  FlashSearchParams,
  UpdateFlashApi,
} from '@/types';
import { errorMessage } from '@/errors';
import { flashValidation } from '@/validations';
import { Media } from '../media/media.entity';
import console from 'console';

@Injectable()
export class FlashService {
  constructor(
    @InjectRepository(Flash)
    private flashRepository: Repository<Flash>,
    private mediaService: MediaService,
  ) {}

  formatFlash(flash?: Flash): FlashDto {
    if (!flash) return;
    return {
      id: flash.id,
      images: flash.images.map((image) => this.mediaService.formatMedia(image)),
      isAvailable: flash.isAvailable,
      isVisible: flash.isVisible,
      createdAt: flash.createdAt,
      updatedAt: flash.updatedAt,
    };
  }

  searchCondition(searchParams?: FlashSearchParams): FindManyOptions<Flash> {
    const relations = ['images'];

    if (!searchParams)
      return {
        relations,
      };

    const order = {
      [searchParams.orderBy ?? 'createdAt']: searchParams.orderType ?? 'DESC',
    };

    const where = {
      isVisible: searchParams.isVisible,
      isAvailable: searchParams.isAvailable,
    };

    return {
      where,
      relations,
      order,
      skip: searchParams.page * searchParams.pageSize,
      take: searchParams.pageSize,
    };
  }

  async getFlashById(_id: string): Promise<Flash> {
    try {
      return await this.flashRepository.findOneOrFail({
        where: [{ id: _id }],
        relations: ['images'],
      });
    } catch (e) {
      throw new NotFoundException(errorMessage.api('flash').NOT_FOUND, _id);
    }
  }

  async getAllFlashes(
    searchParams?: FlashSearchParams,
  ): Promise<ApiSearchResponse<Flash>> {
    try {
      const [flashes, total] = await this.flashRepository.findAndCount(
        this.searchCondition(searchParams),
      );
      return {
        items: flashes,
        total,
        page: searchParams.page,
      };
    } catch (error) {
      console.log(error);
      throw new NotFoundException(errorMessage.api('flash').NOT_FOUND);
    }
  }

  async createFlash(data: CreateFlashApi): Promise<Flash> {
    try {
      const { imageIds, ...flashData } = data;
      await flashValidation.create.validate(data, {
        abortEarly: false,
      });
      let images: Media[];
      if (imageIds) {
        images = await Promise.all(
          imageIds.map((imageId) => this.mediaService.getMediaById(imageId)),
        );
      }
      const { id } = await this.flashRepository.save({
        ...flashData,
        images,
      });
      return await this.getFlashById(id);
    } catch (e) {
      console.log(e);
      throw new BadRequestException(e.errors);
    }
  }

  async updateFlash(data: UpdateFlashApi, id: string): Promise<Flash> {
    try {
      const { imageIds, ...flashData } = data;

      await flashValidation.update.validate(data, {
        abortEarly: false,
      });
      const flash = await this.getFlashById(id);
      let images: Media[];
      if (imageIds) {
        await Promise.all(
          flash.images.map((image) => this.mediaService.deleteMedia(image.id)),
        );
        images = await Promise.all(
          imageIds.map((imageId) => this.mediaService.getMediaById(imageId)),
        );
      }
      await this.flashRepository.save({
        ...flash,
        ...flashData,
        images,
      });
      return await this.getFlashById(id);
    } catch (e) {
      console.log(e);
      throw new BadRequestException(e.errors);
    }
  }

  async deleteFlash(id: string): Promise<void> {
    try {
      const flash = await this.getFlashById(id);
      if (flash.images) {
        await Promise.all(
          flash.images.map((image) => this.mediaService.deleteMedia(image.id)),
        );
      }
      await this.flashRepository.delete(id);
    } catch (error) {
      throw new NotFoundException(errorMessage.api('flash').NOT_DELETED, id);
    }
  }
}
