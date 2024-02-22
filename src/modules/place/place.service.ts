import { errorMessage } from '@/errors';
import {
  ApiSearchResponse,
  CreatePlaceApi,
  PlaceDto,
  SearchParams,
  UpdatePlaceApi,
} from '@/types';
import { placeValidation } from '@/validations';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { Place } from './place.entity';
import { AddressService } from '../address/address.service';
import { searchByString } from '@/utils/search';

@Injectable()
export class PlaceService {
  constructor(
    @InjectRepository(Place)
    private placeRepository: Repository<Place>,
    private addressService: AddressService,
  ) {}

  formatPlace(place?: Place): PlaceDto {
    if (!place) return;
    return {
      id: place.id,
      name: place.name,
      address: this.addressService.formatAddress(place.address),
      createdAt: place.createdAt,
      updatedAt: place.updatedAt,
    };
  }

  searchCondition(searchParams?: SearchParams): FindManyOptions<Place> {
    const relations = ['address'];

    if (!searchParams)
      return {
        relations,
      };

    const order = {
      [searchParams.orderBy ?? 'createdAt']: searchParams.orderType ?? 'DESC',
    };

    const where = {
      name: searchByString(searchParams?.search),
    };

    return {
      relations,
      order,
      where,
      skip: searchParams.page * searchParams.pageSize,
      take: searchParams.pageSize,
    };
  }

  async getPlaceById(_id: string): Promise<Place> {
    try {
      const place = await this.placeRepository.findOneOrFail({
        where: [{ id: _id }],
        relations: ['address'],
      });
      return place;
    } catch (error) {
      throw new NotFoundException(errorMessage.api('place').NOT_FOUND, _id);
    }
  }

  async getAllPlaces(
    searchParams?: SearchParams,
  ): Promise<ApiSearchResponse<Place>> {
    try {
      const [items, total] = await this.placeRepository.findAndCount(
        this.searchCondition(searchParams),
      );
      return {
        items,
        total,
        page: searchParams.page,
      };
    } catch (error) {
      throw new BadRequestException(errorMessage.api('place').NOT_FOUND);
    }
  }

  async createPlace(place: CreatePlaceApi): Promise<Place> {
    try {
      await placeValidation.create.validate(place, {
        abortEarly: false,
      });
      let address;
      if (place.addressId) {
        address = await this.addressService.getAddressById(place.addressId);
        if (!address) {
          throw new BadRequestException(errorMessage.api('address').NOT_FOUND);
        }
      }
      const { id } = await this.placeRepository.save({ ...place, address });
      return await this.getPlaceById(id);
    } catch (e) {
      throw new BadRequestException(e.errors);
    }
  }

  async updatePlace(place: UpdatePlaceApi, id: string): Promise<Place> {
    try {
      await placeValidation.update.validate(place, {
        abortEarly: false,
      });
      await this.placeRepository.update(id, place);
      return await this.getPlaceById(id);
    } catch (e) {
      console.log(e);
      throw new BadRequestException(e.errors);
    }
  }

  async deletePlace(id: string): Promise<void> {
    try {
      const place = await this.getPlaceById(id);
      if (place.address) {
        await this.addressService.deleteAddress(place.address.id);
      }
      await this.placeRepository.delete(id);
    } catch (error) {
      console.log(error);
      throw new BadRequestException(errorMessage.api('place').NOT_DELETED, id);
    }
  }
}
