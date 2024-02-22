import { ApiKeyGuard } from '@/decorators/api-key.decorator';
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
import { SessionService } from './session.service';
import {
  CreateSessionApi,
  SessionSearchParams,
  UpdateSessionApi,
} from '@/types/api/Session';
import { ApiSearchResponse, SessionDto } from '@/types';
import { GetSearchParams } from '@/decorators/get-search-params.decorator';

@Controller('sessions')
export class SessionController {
  constructor(private service: SessionService) {}

  @Get(':id')
  @HttpCode(200)
  @UseGuards(ApiKeyGuard)
  @ApiBearerAuth()
  async get(@Param('id') id: string) {
    return this.service.formatSession(await this.service.getSessionById(id));
  }

  @Get()
  @HttpCode(200)
  @UseGuards(ApiKeyGuard)
  @ApiBearerAuth()
  async getAll(
    @GetSearchParams<SessionSearchParams>()
    searchParams: SessionSearchParams,
  ): Promise<ApiSearchResponse<SessionDto>> {
    const sessions = await this.service.getAllSessions(searchParams);
    return {
      ...sessions,
      items: sessions.items.map((session) =>
        this.service.formatSession(session),
      ),
    };
  }

  @Post()
  @HttpCode(201)
  @UseGuards(ApiKeyGuard)
  @ApiBearerAuth()
  async create(@Body() body: CreateSessionApi) {
    return this.service.formatSession(await this.service.createSession(body));
  }

  @Patch(':id')
  @HttpCode(200)
  @UseGuards(ApiKeyGuard)
  @ApiBearerAuth()
  async update(@Body() body: UpdateSessionApi, @Param('id') id: string) {
    return this.service.formatSession(
      await this.service.updateSession(body, id),
    );
  }

  @Delete(':id')
  @HttpCode(204)
  @UseGuards(ApiKeyGuard)
  @ApiBearerAuth()
  delete(@Param('id') id: string) {
    return this.service.deleteSession(id);
  }
}
