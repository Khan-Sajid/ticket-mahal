import storage from "redux-persist/es/storage";
import { categoriesApi } from "./api";
import { createExpirationTransform } from "@/redux/middleware/reduxTransformsExpire";
import { cashApiTime } from "@/constants";

export const categoriesApiPersistConfig = {
    key: categoriesApi.reducerPath,
    storage,
    whitelist: ["queries"],
    transforms: [
      createExpirationTransform(
        cashApiTime[categoriesApi.reducerPath],
        categoriesApi.reducerPath
      ),
    ],
  };
  