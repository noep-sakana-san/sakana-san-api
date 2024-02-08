export interface CreatePlaceApi {
  name: string;
  addressId: string;
}

export interface UpdatePlaceApi {
  name?: string;
  addressId?: string;
}
