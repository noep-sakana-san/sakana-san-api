import { SearchParams } from './SearchParams';

export enum ProjectType {
  TATTOO = 'TATTOO',
  FLASH = 'FLASH',
  PRINT = 'PRINT',
  OTHER = 'OTHER',
}

export interface CreateProjectApi {
  type: ProjectType;
  date: Date;
  imageIds: string[];
  isVisible: boolean;
  isFavorite?: boolean;
  title?: string;
  description?: string;
  healedIds?: string[];
  placeId?: string;
  coverImageId?: string;
  coverHealedId?: string;
}

export interface UpdateProjectApi {
  type?: ProjectType;
  date?: Date;
  imageIds?: string[];
  isVisible?: boolean;
  isFavorite?: boolean;
  title?: string;
  description?: string;
  healedIds?: string[];
  placeId?: string;
  coverImageId?: string;
  coverHealedId?: string;
}

export interface ProjectSearchParams extends SearchParams {
  isVisible?: boolean;
  placeId?: string;
  isFavorite?: boolean;
  type?: ProjectType;
}
