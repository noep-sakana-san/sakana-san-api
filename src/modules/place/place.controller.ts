import { ApiKeyGuard } from '@/decorators/api-key.decorator';
import { CreatePlaceApi, UpdatePlaceApi } from '@/types';
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
import { PlaceService } from './place.service';

@Controller('place')
export class PlaceController {
  constructor(private service: PlaceService) {}

  @Get(':id')
  @HttpCode(200)
  @UseGuards(ApiKeyGuard)
  @ApiBearerAuth()
  async get(@Param() params) {
    return this.service.formatPlace(await this.service.getPlaceById(params.id));
  }

  @Post()
  @HttpCode(201)
  @UseGuards(ApiKeyGuard)
  @ApiBearerAuth()
  async create(@Body() body: CreatePlaceApi) {
    return this.service.formatPlace(await this.service.createPlace(body));
  }

  @Patch(':id')
  @HttpCode(200)
  @UseGuards(ApiKeyGuard)
  @ApiBearerAuth()
  async update(@Body() body: UpdatePlaceApi, @Param() params) {
    return this.service.formatPlace(
      await this.service.updatePlace(body, params.id),
    );
  }

  @Delete(':id')
  @HttpCode(204)
  @UseGuards(ApiKeyGuard)
  @ApiBearerAuth()
  delete(@Param() params) {
    return this.service.deletePlace(params.id);
  }
}
