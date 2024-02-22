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
import { TattooService } from './tattoo.service';
import { ApiKeyGuard } from '@/decorators/api-key.decorator';
import { GetSearchParams } from '@/decorators/get-search-params.decorator';
import {
  TattooSearchParams,
  ApiSearchResponse,
  TattooDto,
  CreateTattooApi,
  UpdateTattooApi,
} from '@/types';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('tattoos')
export class TattooController {
  constructor(private service: TattooService) {}

  @Get(':id')
  @HttpCode(200)
  @UseGuards(ApiKeyGuard)
  @ApiBearerAuth()
  async get(@Param('id') id: string) {
    return this.service.formatTattoo(await this.service.getTattooById(id));
  }

  @Get()
  @HttpCode(200)
  @UseGuards(ApiKeyGuard)
  @ApiBearerAuth()
  async getAll(
    @GetSearchParams<TattooSearchParams>()
    searchParams: TattooSearchParams,
  ): Promise<ApiSearchResponse<TattooDto>> {
    const tattoos = await this.service.getAllTattoos(searchParams);
    return {
      ...tattoos,
      items: tattoos.items.map((tattoo) => this.service.formatTattoo(tattoo)),
    };
  }

  @Post()
  @HttpCode(201)
  @UseGuards(ApiKeyGuard)
  @ApiBearerAuth()
  async create(@Body() body: CreateTattooApi) {
    return this.service.formatTattoo(await this.service.createTattoo(body));
  }

  @Patch(':id')
  @HttpCode(200)
  @UseGuards(ApiKeyGuard)
  @ApiBearerAuth()
  async update(@Body() body: UpdateTattooApi, @Param('id') id: string) {
    return this.service.formatTattoo(await this.service.updateTattoo(body, id));
  }

  @Delete(':id')
  @HttpCode(204)
  @UseGuards(ApiKeyGuard)
  @ApiBearerAuth()
  delete(@Param('id') id: string) {
    return this.service.deleteTattoo(id);
  }
}
