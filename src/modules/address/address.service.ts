import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Address } from './address.entity';
import { AddressDto, CreateAddressApi, UpdateAddressApi } from '@/types';
import { InjectRepository } from '@nestjs/typeorm';
import { addressValidation } from '@/validations';
import { errorMessage } from '@/errors';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address)
    private addressRepository: Repository<Address>,
  ) {}

  formatAddress(address?: Address): AddressDto {
    if (!address) return;
    return {
      id: address.id,
      street: address.street,
      city: address.city,
      zipCode: address.zipCode,
      country: address.country,
      createdAt: address.createdAt,
      updatedAt: address.updatedAt,
    };
  }

  async getAddressById(_id: string): Promise<Address> {
    try {
      const address = await this.addressRepository.findOneOrFail({
        where: [{ id: _id }],
      });
      return address;
    } catch (error) {
      throw new NotFoundException(errorMessage.api('address').NOT_FOUND, _id);
    }
  }

  async createAddress(address: CreateAddressApi): Promise<Address> {
    try {
      await addressValidation.create.validate(address, {
        abortEarly: false,
      });
      return await this.addressRepository.save(address);
    } catch (e) {
      throw new BadRequestException(e.errors);
    }
  }

  async updateAddress(address: UpdateAddressApi, id: string): Promise<Address> {
    try {
      await addressValidation.update.validate(address);
      await this.addressRepository.update(id, address);
      return await this.getAddressById(id);
    } catch (e) {
      throw new BadRequestException(e.errors);
    }
  }

  async deleteAddress(id: string): Promise<void> {
    try {
      await this.addressRepository.delete(id);
    } catch (error) {
      console.log(error);
      throw new BadRequestException(
        errorMessage.api('address').NOT_DELETED,
        id,
      );
    }
  }
}
