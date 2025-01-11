import { categoriesApi } from "@/redux/features/categories/api";
import { eventsApi } from "@/redux/features/home/api";
export * from "./countries";

export const persistVersion = "v1";
export const cashApiTime = {
  [categoriesApi.reducerPath]: 20,
  [eventsApi.reducerPath]: 10,
};

export const COUNTRY_CODE = "+971";

export const emailFormat = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const phoneFormat = /^\d+$/;
