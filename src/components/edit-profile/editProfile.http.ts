import { IBackendResponse } from "@/interfaces";
import { getSession } from "@/utils/userAuth";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const UPDATE_DEATIL_PATH = `/api/v1/users/web`;

export async function updateUserDetails(
  detail: Record<string, string>
): Promise<IBackendResponse<any>> {
  const myHeaders = new Headers();
  myHeaders.append("accept", "*/*");
  myHeaders.append("Content-Language", "en");
  myHeaders.append("x-api-key", "apiKey");
  myHeaders.append("Content-Type", "application/json");
  const token = getSession();
  if (token) myHeaders.append("Authorization", `Bearer ${token}`);

  const requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: JSON.stringify(detail),
  };

  return fetch(`${apiUrl}${UPDATE_DEATIL_PATH}`, requestOptions)
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
      return error;
    });
}
