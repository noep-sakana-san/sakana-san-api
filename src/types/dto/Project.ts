import { BaseDto } from './BaseDto';
import { PlaceDto } from './Place';
import { MediaDto } from './Media';
import { ProjectType } from '../api';

export interface ProjectDto extends BaseDto {
  type: ProjectType;
  date: Date;
  images: MediaDto[];
  isVisible: boolean;
  isFavorite: boolean;
  title?: string;
  description?: string;
  healeds?: MediaDto[];
  place?: PlaceDto;
}
