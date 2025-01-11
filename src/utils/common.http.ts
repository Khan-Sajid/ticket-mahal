import { IBackendResponse } from "@/interfaces";
import { getSession } from "./userAuth";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const pathNames = {
  favorite: "/api/v1/web/events/favorite",
  uploadToBucket: "/api/v1/web/uploads/users/file",
};

export async function favorite(eventId: string, isFav: boolean) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `Bearer ${getSession()}`);

  const raw = JSON.stringify({
    isFav,
  });

  const requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: raw,
  };

  return fetch(`${apiUrl}${pathNames.favorite}/${eventId}`, requestOptions)
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
      return error;
    });
}

export async function uploadToBucket(
  files: any,
  name: string = "Untitled"
): Promise<IBackendResponse<string>> {
  const myHeaders = new Headers();
  myHeaders.append("accept", "*/*");
  myHeaders.append("Content-Language", "en");
  myHeaders.append("x-api-key", "apiKey");
  const token = getSession();
  if (token) myHeaders.append("Authorization", `Bearer ${token}`);

  const formdata = new FormData();
  formdata.append("file", files[0], name);

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
  };

  return fetch(`${apiUrl}${pathNames.uploadToBucket}`, requestOptions)
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
      return error;
    });
}
