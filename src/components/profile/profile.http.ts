import { IBackendResponse } from "@/interfaces";
import { IUser } from "@/interfaces/user";
import { getSession } from "@/utils/userAuth";
import { BookingStatus } from "./profile.enum";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const pathNames = {
  users: "/api/v1/web/users",
  bookings: "/api/v1/web/bookings",
  support: "/api/v1/web/support",
  supportReasonOptions: "/api/v1/web/support/reasons",
};

export async function fetchUserDetail(
  session?: string
): Promise<IBackendResponse<IUser>> {
  const myHeaders = new Headers();
  myHeaders.append("accept", "*/*");
  myHeaders.append("Content-Language", "en");
  myHeaders.append("Cache", "no-cache");
  const token = session ? session : getSession();
  if (token) myHeaders.append("Authorization", `Bearer ${token}`);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
  };

  return fetch(`${apiUrl}${pathNames.users}`, requestOptions)
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
      return error;
    });
}

export async function updateUserDetails(
  data: Partial<IUser>
): Promise<IBackendResponse<any>> {
  const myHeaders = new Headers();
  myHeaders.append("accept", "*/*");
  myHeaders.append("Content-Language", "en");
  myHeaders.append("x-api-key", "apiKey");
  const token = getSession();
  if (token) myHeaders.append("Authorization", `Bearer ${token}`);
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify(data);

  const requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: raw,
  };

  return fetch(`${apiUrl}${pathNames.users}`, requestOptions)
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
      return error;
    });
}

export async function getBookings({
  page,
  limit,
  status,
}: {
  page: number;
  limit: number;
  status: BookingStatus;
}): Promise<IBackendResponse<any>> {
  const myHeaders = new Headers();
  myHeaders.append("accept", "*/*");
  myHeaders.append("Content-Language", "en");
  myHeaders.append("x-api-key", "apiKey");
  const token = getSession();
  myHeaders.append("Authorization", `Bearer ${token}`);
  const searchParams = new URLSearchParams();
  searchParams.set("page", page.toString());
  searchParams.set("limit", limit.toString());
  searchParams.set("status", status);

  const requestOptions: any = {
    method: "GET",
    headers: myHeaders,
    cache: "no-cache",
  };

  return fetch(`${apiUrl}${pathNames.bookings}?${searchParams}`, requestOptions)
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
      return error;
    });
}

export async function getBookingDetails(
  BookingId: string
): Promise<IBackendResponse<any>> {
  const myHeaders = new Headers();
  myHeaders.append("accept", "*/*");
  myHeaders.append("Content-Language", "en");
  myHeaders.append("x-api-key", "apiKey");
  const token = getSession();
  myHeaders.append("Authorization", `Bearer ${token}`);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
  };

  return fetch(`${apiUrl}${pathNames.bookings}/${BookingId}`, requestOptions)
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
      return error;
    });
}
export async function cancelBooking(
  BookingId: string
): Promise<IBackendResponse<any>> {
  const myHeaders = new Headers();
  myHeaders.append("accept", "*/*");
  myHeaders.append("Content-Language", "en");
  myHeaders.append("x-api-key", "apiKey");
  const token = getSession();
  myHeaders.append("Authorization", `Bearer ${token}`);

  const requestOptions = {
    method: "PATCH",
    headers: myHeaders,
  };

  return fetch(`${apiUrl}${pathNames.bookings}/${BookingId}`, requestOptions)
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
      return error;
    });
}
export async function raiseSupport(body: {
  reason: string;
  remark: string;
  bookingId: string;
}): Promise<IBackendResponse<any>> {
  const myHeaders = new Headers();
  myHeaders.append("accept", "*/*");
  myHeaders.append("Content-Language", "en");
  myHeaders.append("x-api-key", "apiKey");
  myHeaders.append("Content-Type", "application/json");
  const token = getSession();
  myHeaders.append("Authorization", `Bearer ${token}`);

  const raw = JSON.stringify(body);

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
  };

  return fetch(`${apiUrl}${pathNames.support}`, requestOptions)
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
      return error;
    });
}
export async function getSupportReasonOptions(): Promise<
  IBackendResponse<any>
> {
  const myHeaders = new Headers();
  myHeaders.append("accept", "*/*");
  myHeaders.append("Content-Language", "en");
  myHeaders.append("x-api-key", "apiKey");
  const token = getSession();
  myHeaders.append("Authorization", `Bearer ${token}`);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
  };

  return fetch(`${apiUrl}${pathNames.supportReasonOptions}`, requestOptions)
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
      return error;
    });
}
