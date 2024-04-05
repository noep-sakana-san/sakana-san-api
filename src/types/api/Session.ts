import { SearchParams } from './SearchParams';

export interface CreateSessionApi {
  name?: string;
  placeId: string;
  startDate: Date;
  endDate?: Date;
  isVisible: boolean;
}

export interface UpdateSessionApi {
  name?: string;
  placeId?: string;
  startDate?: Date;
  endDate?: Date;
  isVisible?: boolean;
}

export interface SessionSearchParams extends SearchParams {
  isVisible?: boolean;
  placeId?: string;
  isArchived?: boolean;
}
