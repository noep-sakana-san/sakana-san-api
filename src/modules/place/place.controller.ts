import { ApiKeyGuard } from '@/decorators/api-key.decorator';
import {
  ApiSearchResponse,
  CreatePlaceApi,
  PlaceDto,
  SearchParams,
  UpdatePlaceApi,
} from '@/types';
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
import { GetSearchParams } from '@/decorators/get-search-params.decorator';

@Controller('places')
export class PlaceController {
  constructor(private service: PlaceService) {}

  @Get(':id')
  @HttpCode(200)
  @UseGuards(ApiKeyGuard)
  @ApiBearerAuth()
  async get(@Param('id') id: string) {
    return this.service.formatPlace(await this.service.getPlaceById(id));
  }

  @Get()
  @HttpCode(200)
  @UseGuards(ApiKeyGuard)
  @ApiBearerAuth()
  async getAll(
    @GetSearchParams<SearchParams>()
    searchParams: SearchParams,
  ): Promise<ApiSearchResponse<PlaceDto>> {
    const places = await this.service.getAllPlaces(searchParams);
    return {
      ...places,
      items: places.items.map((place) => this.service.formatPlace(place)),
    };
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
  async update(@Body() body: UpdatePlaceApi, @Param('id') id: string) {
    return this.service.formatPlace(await this.service.updatePlace(body, id));
  }

  @Delete(':id')
  @HttpCode(204)
  @UseGuards(ApiKeyGuard)
  @ApiBearerAuth()
  delete(@Param('id') id: string) {
    return this.service.deletePlace(id);
  }
}
