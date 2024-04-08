import { BaseDto } from './BaseDto';
import { PlaceDto } from './Place';

export interface UserDto extends BaseDto {
  userName: string;
  description?: string;
  place?: PlaceDto;
  email?: string;
  phone?: string;
  instagram?: string;
  facebook?: string;
}
