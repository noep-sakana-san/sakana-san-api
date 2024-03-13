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
import { ProjectService } from './project.service';
import { ApiKeyGuard } from '@/decorators/api-key.decorator';
import { GetSearchParams } from '@/decorators/get-search-params.decorator';
import {
  ProjectSearchParams,
  ApiSearchResponse,
  ProjectDto,
  CreateProjectApi,
  UpdateProjectApi,
} from '@/types';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('projects')
export class ProjectController {
  constructor(private service: ProjectService) {}

  @Get(':id')
  @HttpCode(200)
  @UseGuards(ApiKeyGuard)
  @ApiBearerAuth()
  async get(@Param('id') id: string) {
    return this.service.formatProject(await this.service.getProjectById(id));
  }

  @Get()
  @HttpCode(200)
  @UseGuards(ApiKeyGuard)
  @ApiBearerAuth()
  async getAll(
    @GetSearchParams<ProjectSearchParams>()
    searchParams: ProjectSearchParams,
  ): Promise<ApiSearchResponse<ProjectDto>> {
    const projects = await this.service.getAllProjects(searchParams);
    return {
      ...projects,
      items: projects.items.map((project) =>
        this.service.formatProject(project),
      ),
    };
  }

  @Post()
  @HttpCode(201)
  @UseGuards(ApiKeyGuard)
  @ApiBearerAuth()
  async create(@Body() body: CreateProjectApi) {
    return this.service.formatProject(await this.service.createProject(body));
  }

  @Patch(':id')
  @HttpCode(200)
  @UseGuards(ApiKeyGuard)
  @ApiBearerAuth()
  async update(@Body() body: UpdateProjectApi, @Param('id') id: string) {
    return this.service.formatProject(
      await this.service.updateProject(body, id),
    );
  }

  @Delete(':id')
  @HttpCode(204)
  @UseGuards(ApiKeyGuard)
  @ApiBearerAuth()
  delete(@Param('id') id: string) {
    return this.service.deleteProject(id);
  }
}
