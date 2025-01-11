import { COUNTRY_CODE } from "@/constants";
import { IBackendResponse } from "@/interfaces";
import { getSession } from "@/utils/userAuth";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const pathNames = {
  CHANGE_PHONE: "/api/v1/web/users/change-phone",
  CHANGE_EMAIL: "/api/v1/web/users/change-email",
};

export async function updateEmail(body: {
  newEmail: string;
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

  return fetch(`${apiUrl}${pathNames.CHANGE_EMAIL}`, requestOptions)
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
      return error;
    });
}

export async function updatePhone(body: {
  newPhoneNo: string;
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
    body: JSON.stringify({ ...body, countryCode: COUNTRY_CODE }),
  };

  return fetch(`${apiUrl}${pathNames.CHANGE_PHONE}`, requestOptions)
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
      return error;
    });
}
