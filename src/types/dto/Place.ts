import { AddressDto } from './Address';
import { BaseDto } from './BaseDto';

export interface PlaceDto extends BaseDto {
  name: string;
  address: AddressDto;
}
