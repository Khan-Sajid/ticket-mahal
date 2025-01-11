import { IBackendResponse } from "@/interfaces";
import { ICheckoutPayload } from "@/interfaces/booking";
import { getSession } from "@/utils/userAuth";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const pathNames = {
  checkout: "/api/v1/web/bookings/check-out",
};
export async function checkoutBooking(
  body: ICheckoutPayload
): Promise<IBackendResponse<any>> {
  const myHeaders = new Headers();
  myHeaders.append("accept", "*/*");
  myHeaders.append("Content-Language", "en");
  myHeaders.append("x-api-key", "apiKey");
  const token = getSession();
  token && myHeaders.append("Authorization", `Bearer ${token}`);
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify(body);

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
  };

  return fetch(`${apiUrl}${pathNames.checkout}`, requestOptions)
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
      return error;
    });
}
