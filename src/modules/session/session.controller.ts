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
import { CreateSessionApi, UpdateSessionApi } from '@/types/api/Session';

@Controller('session')
export class SessionController {
  constructor(private service: SessionService) {}

  @Get(':id')
  @HttpCode(200)
  @UseGuards(ApiKeyGuard)
  @ApiBearerAuth()
  async get(@Param() params) {
    return this.service.formatSession(
      await this.service.getSessionById(params.id),
    );
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
  async update(@Body() body: UpdateSessionApi, @Param() params) {
    return this.service.formatSession(
      await this.service.updateSession(body, params.id),
    );
  }

  @Delete(':id')
  @HttpCode(204)
  @UseGuards(ApiKeyGuard)
  @ApiBearerAuth()
  delete(@Param() params) {
    return this.service.deleteSession(params.id);
  }
}
