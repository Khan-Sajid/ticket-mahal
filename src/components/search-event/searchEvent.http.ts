import { Event, IBackendResponse } from "@/interfaces";
import { getSession } from "@/utils/userAuth";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const pathNames = {
  search: "/api/v1/web/events/search",
};
export async function getSearchEvents({
  search,
  limit = 20,
}: {
  search: string;
  page?: number;
  limit?: number;
}): Promise<IBackendResponse<Event[]>> {
  const myHeaders = new Headers();
  myHeaders.append("accept", "*/*");
  myHeaders.append("Content-Language", "en");
  myHeaders.append("x-api-key", "apiKey");
  myHeaders.append("cache", "no-cache");
  const token = getSession();
  token && myHeaders.append("Authorization", `Bearer ${token}`);

  const searchParams = new URLSearchParams();
  searchParams.set("limit", limit.toString());
  searchParams.set("search", search);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
  };

  return fetch(`${apiUrl}${pathNames.search}?${searchParams}`, requestOptions)
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
      return error;
    });
}
