import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { MediaService } from '../media/media.service';
import { PlaceService } from '../place/place.service';
import { Project } from './project.entity';
import {
  ApiSearchResponse,
  CreateProjectApi,
  ProjectDto,
  ProjectSearchParams,
  UpdateProjectApi,
} from '@/types';
import { searchByString } from '@/utils/search';
import { errorMessage } from '@/errors';
import { projectValidation } from '@/validations';
import { Media } from '../media/media.entity';
import { Place } from '../place/place.entity';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
    private mediaService: MediaService,
    private placeService: PlaceService,
  ) {}

  formatProject(project?: Project): ProjectDto {
    if (!project) return;
    const coverImage = project.images.find(
      (image) => image.id === project.coverImageId,
    );
    const coverHealed = project.healeds.find(
      (image) => image.id === project.coverHealedId,
    );
    return {
      id: project.id,
      type: project.type,
      date: project.date,
      images: project.images.map((image) =>
        this.mediaService.formatMedia(image),
      ),
      isVisible: project.isVisible,
      isFavorite: project.isFavorite,
      title: project.title ?? undefined,
      description: project.description ?? undefined,
      healeds: project.healeds?.map((image) =>
        this.mediaService.formatMedia(image),
      ),
      place: this.placeService.formatPlace(project.place),
      createdAt: project.createdAt,
      updatedAt: project.updatedAt,
      coverImage: this.mediaService.formatMedia(coverImage),
      coverHealed: this.mediaService.formatMedia(coverHealed),
    };
  }

  searchCondition(
    searchParams?: ProjectSearchParams,
  ): FindManyOptions<Project> {
    const relations = ['images', 'healeds', 'place', 'place.address'];

    if (!searchParams)
      return {
        relations,
      };

    const order = {
      [searchParams.orderBy ?? 'createdAt']: searchParams.orderType ?? 'DESC',
    };

    const where = {
      title: searchByString(searchParams?.search),
      type: searchParams.type,
      isVisible: searchParams.isVisible,
      isFavorite: searchParams.isFavorite,
      place: {
        id: searchParams.placeId,
      },
    };

    return {
      relations,
      order,
      where,
      skip: searchParams.page * searchParams.pageSize,
      take: searchParams.pageSize,
    };
  }

  async getProjectById(_id: string): Promise<Project> {
    try {
      const project = await this.projectRepository.findOneOrFail({
        where: [{ id: _id }],
        relations: ['images', 'healeds', 'place', 'place.address'],
      });

      return project;
    } catch (error) {
      throw new NotFoundException(errorMessage.api('project').NOT_FOUND, _id);
    }
  }

  async getAllProjects(
    searchParams?: ProjectSearchParams,
  ): Promise<ApiSearchResponse<Project>> {
    try {
      const [projects, total] = await this.projectRepository.findAndCount(
        this.searchCondition(searchParams),
      );
      return {
        items: projects,
        total,
        page: searchParams.page,
      };
    } catch (error) {
      throw new NotFoundException(errorMessage.api('project').NOT_FOUND);
    }
  }

  async createProject(data: CreateProjectApi): Promise<Project> {
    try {
      await projectValidation.create.validate(data, {
        abortEarly: false,
      });
      const { imageIds, healedIds, placeId, ...projectData } = data;
      let images: Media[];
      if (imageIds) {
        images = await Promise.all(
          imageIds.map((imageId) => this.mediaService.getMediaById(imageId)),
        );
      }
      let healeds: Media[];
      if (healedIds) {
        healeds = await Promise.all(
          healedIds.map((imageId) => this.mediaService.getMediaById(imageId)),
        );
      }
      let place: Place;
      if (placeId) {
        place = await this.placeService.getPlaceById(placeId);
      }
      const { id } = await this.projectRepository.save({
        ...projectData,
        images,
        healeds,
        place,
      });
      return await this.getProjectById(id);
    } catch (e) {
      console.log(e);
      throw new BadRequestException(e.errors);
    }
  }

  async updateProject(data: UpdateProjectApi, id: string): Promise<Project> {
    try {
      const { imageIds, healedIds, placeId, ...projectData } = data;
      await projectValidation.update.validate(data, {
        abortEarly: false,
      });
      const project = await this.getProjectById(id);

      let images: Media[];
      if (imageIds) {
        const imagesToDelete = project.images.filter(
          (image) => !imageIds.includes(image.id),
        );
        await Promise.all(
          imagesToDelete.map((image) =>
            this.mediaService.deleteMedia(image.id),
          ),
        );

        images = await Promise.all(
          imageIds.map((imageId) => this.mediaService.getMediaById(imageId)),
        );
      }

      let healeds: Media[];
      if (healedIds) {
        const imagesToDelete = project.healeds.filter(
          (image) => !healedIds.includes(image.id),
        );
        await Promise.all(
          imagesToDelete.map((image) =>
            this.mediaService.deleteMedia(image.id),
          ),
        );
        healeds = await Promise.all(
          healedIds.map((imageId) => this.mediaService.getMediaById(imageId)),
        );
      }

      let place: Place;
      if (placeId) {
        place = await this.placeService.getPlaceById(placeId);
      }

      await this.projectRepository.save({
        ...project,
        ...projectData,
        images,
        healeds,
        place,
        title: projectData.title ?? null,
        description: projectData.description ?? null,
      });
      return await this.getProjectById(id);
    } catch (e) {
      console.log(e);
      throw new BadRequestException(e.errors);
    }
  }

  async deleteProject(id: string): Promise<void> {
    try {
      const project = await this.getProjectById(id);
      if (project.images) {
        await Promise.all(
          project.images.map((image) =>
            this.mediaService.deleteMedia(image.id),
          ),
        );
      }
      if (project.healeds) {
        await Promise.all(
          project.healeds.map((image) =>
            this.mediaService.deleteMedia(image.id),
          ),
        );
      }
      await this.projectRepository.delete(id);
    } catch (error) {
      throw new NotFoundException(errorMessage.api('project').NOT_DELETED, id);
    }
  }
}
