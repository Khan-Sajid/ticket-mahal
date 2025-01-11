import { IBackendResponse } from "@/interfaces";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const pathNames = {
  CMS: "/api/v1/web/cms",
};
export async function getCMSContent(): Promise<IBackendResponse<any>> {
  const myHeaders = new Headers();
  myHeaders.append("accept", "*/*");
  myHeaders.append("Content-Language", "en");
  myHeaders.append("x-api-key", "apiKey");
  myHeaders.append("Content-Type", "application/json");

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
  };

  return fetch(`${apiUrl}${pathNames.CMS}`, requestOptions)
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
      return error;
    });
}
