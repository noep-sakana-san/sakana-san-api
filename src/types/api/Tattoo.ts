import { SearchParams } from './SearchParams';

export interface CreateTattooApi {
  date: Date;
  imageIds: string[];
  isVisible: boolean;
  isFavorite?: boolean;
  title?: string;
  description?: string;
  healedIds?: string[];
  placeId?: string;
}

export interface UpdateTattooApi {
  date?: Date;
  imageIds?: string[];
  isVisible?: boolean;
  isFavorite?: boolean;
  title?: string;
  description?: string;
  healedIds?: string[];
  placeId?: string;
}

export interface TattooSearchParams extends SearchParams {
  isVisible?: boolean;
  placeId?: string;
  isFavorite?: boolean;
}
