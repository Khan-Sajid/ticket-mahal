import { IBackendResponse } from "@/interfaces";
import { getSession } from "@/utils/userAuth";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const pathNames = {
  CHANGE_PASSWORD: "/api/v1/web/users/change-password",
};

export async function updatePassword(body: {
  oldPassword: string;
  newPassword: string;
}): Promise<IBackendResponse<any>> {
  const myHeaders = new Headers();
  myHeaders.append("accept", "*/*");
  myHeaders.append("Content-Language", "en");
  myHeaders.append("x-api-key", "apiKey");
  myHeaders.append("Content-Type", "application/json");
  const token = getSession();
  if (token) myHeaders.append("Authorization", `Bearer ${token}`);

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(body),
  };

  return fetch(`${apiUrl}${pathNames.CHANGE_PASSWORD}`, requestOptions)
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
      return error;
    });
}
