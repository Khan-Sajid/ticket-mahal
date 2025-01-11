import { IBackendResponse } from "@/interfaces";
import { BannerEvent } from "@/interfaces/home";
import { EventType } from "@/utils/enums";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const pathNames = {
  viewAll: "/api/v1/web/events/view-all",
  banner: "/api/v1/web/events/banner",
};

export async function getAllEvents<T>(params: {
  eventType?: EventType;
  limit?: number;
  page?: number;
  tags?: string[];
  categoryId?: string;
}): Promise<IBackendResponse<T>> {
  const myHeaders = new Headers();
  // myHeaders.append("cache", "no-cache");
  const requestOptions = {
    method: "GET",
    headers: myHeaders,
  };
  const searchParams = new URLSearchParams();
  if (params.eventType) searchParams.set("eventType", params.eventType);
  if (params.limit) searchParams.set("limit", params.limit.toString());
  if (params.page) searchParams.set("page", params.page.toString());
  if (params.categoryId) searchParams.set("categoryId", params.categoryId);
  let tagsParams = "";
  if (Array.isArray(params?.tags) && params.tags.length)
    tagsParams = "&tags=" + params.tags.join("&tags=");
  return fetch(
    `${apiUrl}${pathNames.viewAll}?${searchParams}${
      tagsParams ? tagsParams : ""
    }`,
    requestOptions
  )
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
      return error;
    });
}

export async function getBannerData(): Promise<IBackendResponse<BannerEvent>> {
  const myHeaders = new Headers();
  myHeaders.append("accept", "*/*");
  myHeaders.append("Content-Language", "en");
  myHeaders.append("x-api-key", "apiKey");

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
  };

  return fetch(`${apiUrl}${pathNames.banner}`, requestOptions)
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
      return error;
    });
}
