import { BaseDto } from './BaseDto';
import { PlaceDto } from './Place';

export interface UserDto extends BaseDto {
  userName: string;
  place?: PlaceDto;
}
