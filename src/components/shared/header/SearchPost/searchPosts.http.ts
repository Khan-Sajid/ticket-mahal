import { IBackendResponse } from "@/interfaces";
import { getSession } from "@/utils/userAuth";

export const apiUrl = process.env.NEXT_PUBLIC_API_URL;
export const pathNames = {
  searchHistory: "/api/v1/web/events/search-history",
};
export async function getSearchHistory(): Promise<IBackendResponse<any>> {
  const myHeaders = new Headers();
  myHeaders.append("accept", "*/*");
  myHeaders.append("Content-Language", "en");
  const token = getSession();
  if (token) myHeaders.append("Authorization", `Bearer ${token}`);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
  };

  return fetch(`${apiUrl}${pathNames.searchHistory}`, requestOptions)
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
      return error;
    });
}
