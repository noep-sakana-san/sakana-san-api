import { BaseDto } from './BaseDto';
import { PlaceDto } from './Place';

export interface SessionDto extends BaseDto {
  name?: string;
  place: PlaceDto;
  startDate: Date;
  endDate: Date;
}
