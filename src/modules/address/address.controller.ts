import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ApiKeyGuard } from 'src/decorators/api-key.decorator';
import { AddressService } from './address.service';
import { CreateAddressApi, UpdateAddressApi } from '@/types';

@Controller('address')
export class AddressController {
  constructor(private service: AddressService) {}

  @Get(':id')
  @HttpCode(200)
  @UseGuards(ApiKeyGuard)
  @ApiBearerAuth()
  async get(@Param() params) {
    return this.service.formatAddress(
      await this.service.getAddressById(params.id),
    );
  }

  @Post()
  @HttpCode(201)
  @UseGuards(ApiKeyGuard)
  @ApiBearerAuth()
  async create(@Body() body: CreateAddressApi) {
    return this.service.formatAddress(await this.service.createAddress(body));
  }

  @Patch(':id')
  @HttpCode(200)
  @UseGuards(ApiKeyGuard)
  @ApiBearerAuth()
  async update(@Body() body: UpdateAddressApi, @Param() params) {
    return this.service.formatAddress(
      await this.service.updateAddress(body, params.id),
    );
  }

  @Delete(':id')
  @HttpCode(204)
  @UseGuards(ApiKeyGuard)
  @ApiBearerAuth()
  delete(@Param() params) {
    return this.service.deleteAddress(params.id);
  }
}
