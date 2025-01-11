import { IBackendResponse } from "@/interfaces";
import { IEventDetail } from "./eventDetail.types";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const pathName = {
  eventDetail: "/api/v1/web/events",
};

export async function getEventDetail(
  eventId: string
): Promise<IBackendResponse<IEventDetail>> {
  const myHeaders = new Headers();
  myHeaders.append("accept", "*/*");
  myHeaders.append("Content-Language", "en");
  myHeaders.append("x-api-key", "apiKey");
  myHeaders.append("cache", "no-cache");

  // const session = getSession();
  // if (session) myHeaders.append("Authorization", `Bearer ${session}`);

  const requestOptions: any = {
    method: "GET",
    headers: myHeaders,
    cache: "no-store",
  };

  return fetch(`${apiUrl}${pathName.eventDetail}/${eventId}`, requestOptions)
    .then((response) => response.json())
    .catch((error) => {
      console.log("errrrrrooooooorrrrr", error);
      console.error(error);
      return error;
    });
}
