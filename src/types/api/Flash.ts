import { SearchParams } from './SearchParams';

export interface CreateFlashApi {
  imageIds: string[];
  isVisible: boolean;
  isFavorite: boolean;
  isAvailable: boolean;
}

export interface UpdateFlashApi {
  imageIds?: string[];
  isVisible?: boolean;
  isFavorite?: boolean;
  isAvailable?: boolean;
}

export interface FlashSearchParams extends SearchParams {
  isVisible?: boolean;
  isAvailable?: boolean;
  isFavorite?: boolean;
}
