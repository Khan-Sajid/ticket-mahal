import { IBackendResponse } from "@/interfaces";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const pathNames = {
  recommended: "/api/v1/web/events/recommended",
};

export async function getAllRecommendedEvents(): Promise<
  IBackendResponse<any>
> {
  const myHeaders = new Headers();
  myHeaders.append("accept", "*/*");
  myHeaders.append("Content-Language", "en");
  myHeaders.append("x-api-key", "apiKey");

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
  };

  return fetch(`${apiUrl}${pathNames.recommended}`, requestOptions)
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
      return error;
    });
}
