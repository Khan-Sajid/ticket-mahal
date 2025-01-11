import storage from "redux-persist/es/storage";
import { eventsApi } from "./api";
import { createExpirationTransform } from "@/redux/middleware/reduxTransformsExpire";
import { cashApiTime } from "@/constants";

export const eventsApiPersistConfig = {
    key: eventsApi.reducerPath,
    storage,
    whitelist: ["queries"],
    transforms: [
      createExpirationTransform(
        cashApiTime[eventsApi.reducerPath],
        eventsApi.reducerPath
      ),
    ],
  };
  