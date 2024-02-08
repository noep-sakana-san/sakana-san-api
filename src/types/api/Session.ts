export interface CreateSessionApi {
  name?: string;
  placeId: string;
  startDate: Date;
  endDate: Date;
}

export interface UpdateSessionApi {
  name?: string;
  placeId?: string;
  startDate?: Date;
  endDate?: Date;
}
