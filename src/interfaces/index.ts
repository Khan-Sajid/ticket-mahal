export * from "./booking";
export * from "./categories";
export * from "./home";
export * from "./user";

export interface IHeader {
  "X-RapidAPI-Key": string;
  "X-RapidAPI-Host": string;
}

export interface IBackendResponse<T> {
  statusCode: number;
  data: T;
  message: string;
}
