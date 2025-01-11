import { getSession } from "@/utils/userAuth";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const urls = {
  HOME_EVENTS: "/api/v1/web/events/home",
  SUBSCRIBE: "/api/v1/web/users/subscribed",
};

export async function getAllHomepageEvents(
  params?: {
    cityId?: string;
    categoryId?: string;
    lat?: string;
    long?: string;
  },
  abortControl?: AbortController
) {
  const myHeaders = new Headers();
  myHeaders.append("x-api-key", "apiKey");
  const searchParams = new URLSearchParams();
  if (params?.cityId) searchParams.set("cityId", params.cityId);
  if (params?.categoryId) searchParams.set("categoryId", params.categoryId);
  if (params?.lat) searchParams.set("lat", params.lat);
  if (params?.long) searchParams.set("long", params.long);

  return fetch(
    `${API_URL}${urls.HOME_EVENTS}${searchParams ? "?" + searchParams : ""}`,
    {
      method: "GET",
      headers: myHeaders,
      signal: abortControl?.signal,
    }
  )
    .then((response) => response.json())
    .catch((error) => {
      console.error("error", error);
      return error;
    });
}
export async function subscribeToTM() {
  const myHeaders = new Headers();
  myHeaders.append("x-api-key", "apiKey");
  const token = getSession();
  if (token) myHeaders.append("Authorization", "Bearer " + token);
  return fetch(`${API_URL}${urls.SUBSCRIBE}`, {
    method: "PUT",
    headers: myHeaders,
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error("error", error);
      return error;
    });
}
