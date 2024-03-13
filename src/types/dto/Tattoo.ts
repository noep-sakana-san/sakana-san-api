import { BaseDto } from './BaseDto';
import { PlaceDto } from './Place';
import { MediaDto } from './Media';

export interface TattooDto extends BaseDto {
  date: Date;
  images: MediaDto[];
  isVisible: boolean;
  isFavorite: boolean;
  title?: string;
  description?: string;
  healeds?: MediaDto[];
  place?: PlaceDto;
}
