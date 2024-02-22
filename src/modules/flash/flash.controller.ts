import { ApiKeyGuard } from '@/decorators/api-key.decorator';
import { GetSearchParams } from '@/decorators/get-search-params.decorator';
import {
  FlashSearchParams,
  ApiSearchResponse,
  FlashDto,
  CreateFlashApi,
  UpdateFlashApi,
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
import { FlashService } from '../flash/flash.service';

@Controller('flashes')
export class FlashController {
  constructor(private service: FlashService) {}

  @Get(':id')
  @HttpCode(200)
  @UseGuards(ApiKeyGuard)
  @ApiBearerAuth()
  async get(@Param('id') id: string) {
    return this.service.formatFlash(await this.service.getFlashById(id));
  }

  @Get()
  @HttpCode(200)
  @UseGuards(ApiKeyGuard)
  @ApiBearerAuth()
  async getAll(
    @GetSearchParams<FlashSearchParams>()
    searchParams: FlashSearchParams,
  ): Promise<ApiSearchResponse<FlashDto>> {
    const flashes = await this.service.getAllFlashes(searchParams);
    return {
      ...flashes,
      items: flashes.items.map((flash) => this.service.formatFlash(flash)),
    };
  }

  @Post()
  @HttpCode(201)
  @UseGuards(ApiKeyGuard)
  @ApiBearerAuth()
  async create(@Body() body: CreateFlashApi) {
    return this.service.formatFlash(await this.service.createFlash(body));
  }

  @Patch(':id')
  @HttpCode(200)
  @UseGuards(ApiKeyGuard)
  @ApiBearerAuth()
  async update(@Body() body: UpdateFlashApi, @Param('id') id: string) {
    return this.service.formatFlash(await this.service.updateFlash(body, id));
  }

  @Delete(':id')
  @HttpCode(204)
  @UseGuards(ApiKeyGuard)
  @ApiBearerAuth()
  delete(@Param('id') id: string) {
    return this.service.deleteFlash(id);
  }
}
