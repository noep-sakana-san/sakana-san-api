import { errorMessage } from '@/errors';
import { CreatePlaceApi, PlaceDto, UpdatePlaceApi } from '@/types';
import { placeValidation } from '@/validations';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Place } from './place.entity';
import { AddressService } from '../address/address.service';

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

  async createPlace(place: CreatePlaceApi): Promise<Place> {
    try {
      await placeValidation.create.validate(place);
      let address;
      if (place.addressId) {
        address = await this.addressService.getAddressById(place.addressId);
        if (!address) {
          throw new BadRequestException(errorMessage.api('address').NOT_FOUND);
        }
      }
      const { id } = await this.placeRepository.save({ ...place, address });
      return await this.getPlaceById(id);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async updatePlace(place: UpdatePlaceApi, id: string): Promise<Place> {
    try {
      await placeValidation.update.validate(place);
      await this.placeRepository.update(id, place);
      return await this.getPlaceById(id);
    } catch (error) {
      throw new BadRequestException(error.message);
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
