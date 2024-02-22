import { BaseDto } from './BaseDto';
import { PlaceDto } from './Place';
import { MediaDto } from './Media';

export interface TattooDto extends BaseDto {
  date: Date;
  images: MediaDto[];
  isVisible: boolean;
  title?: string;
  description?: string;
  afterImages?: MediaDto[];
  place?: PlaceDto;
}
