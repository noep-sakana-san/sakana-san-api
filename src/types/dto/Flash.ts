import { BaseDto } from './BaseDto';
import { MediaDto } from './Media';

export interface FlashDto extends BaseDto {
  images: MediaDto[];
  isVisible: boolean;
  isAvailable: boolean;
  isFavorite: boolean;
}
