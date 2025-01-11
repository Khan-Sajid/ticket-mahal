export interface ICity {
  isRecommendedCity: boolean;
  _id: string;
  name: string;
  image: string;
  status: Status;
}

export enum Status {
  Active = "active",
  InActive = "inactive",
}

export interface PreferredLocation {
  city?: ICity;
  geo?: { lat: string; long: string };
}
