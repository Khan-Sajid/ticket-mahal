import { IBackendResponse } from "@/interfaces";
import { getSession } from "@/utils/userAuth";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const pathNames = {
  CONTACT: "/api/v1/web/contactus",
};

export async function postContactForm(body: {
  name: string;
  email: string;
  phoneNo: string;
  message: string;
  countryCode: string;
}): Promise<IBackendResponse<any>> {
  const myHeaders = new Headers();
  myHeaders.append("accept", "*/*");
  myHeaders.append("Content-Language", "en");
  myHeaders.append("x-api-key", "apiKey");
  myHeaders.append("Content-Type", "application/json");
  const token = getSession();
  if (token) myHeaders.append("Authorization", `Bearer ${token}`);
  const raw = JSON.stringify(body);

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
  };

  return fetch(`${apiUrl}${pathNames.CONTACT}`, requestOptions)
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
      return error;
    });
}
