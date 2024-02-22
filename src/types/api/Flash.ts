import { SearchParams } from './SearchParams';

export interface CreateFlashApi {
  imageIds: string[];
  isVisible: boolean;
  isAvailable: boolean;
}

export interface UpdateFlashApi {
  imageIds?: string[];
  isVisible?: boolean;
  isAvailable?: boolean;
}

export interface FlashSearchParams extends SearchParams {
  isVisible?: boolean;
  isAvailable?: boolean;
}
