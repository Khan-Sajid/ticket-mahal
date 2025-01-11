import { IBackendResponse } from "@/interfaces";
import { getSession } from "@/utils/userAuth";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const pathNames = {
  LOGIN: "/api/v1/users/authentications/log-in",
  FORGOT_PASSWORD: "/api/v1/users/authentications/forgot-password",
  RESET_PASSWORD: "/api/v1/users/authentications/reset-password",
  REGISTER: "/api/v1/web/users/register",
  VERIFY_OTP: "/api/v1/web/users/verify-otp",
  RESEND_OTP: "/api/v1/web/users/resend-otp",
};

export async function postLoginEmailPassword(body: {
  userName: string;
  password: string;
}): Promise<IBackendResponse<any>> {
  const myHeaders = new Headers();
  myHeaders.append("accept", "*/*");
  myHeaders.append("Content-Language", "en");
  myHeaders.append("x-api-key", "apiKey");
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify(body);

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
  };

  return fetch(`${apiUrl}${pathNames.LOGIN}`, requestOptions)
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
      return error;
    });
}

export async function postforgotPassword(body: {
  userName: string;
}): Promise<IBackendResponse<any>> {
  const myHeaders = new Headers();
  myHeaders.append("accept", "*/*");
  myHeaders.append("Content-Language", "en");
  myHeaders.append("x-api-key", "apiKey");
  myHeaders.append("Content-Type", "application/json");
  const raw = JSON.stringify(body);

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
  };

  return fetch(`${apiUrl}${pathNames.FORGOT_PASSWORD}`, requestOptions)
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
      return error;
    });
}
export async function postResetPassword(body: {
  otp: string;
  newPassword: string;
}): Promise<IBackendResponse<any>> {
  const myHeaders = new Headers();
  myHeaders.append("accept", "*/*");
  myHeaders.append("Content-Language", "en");
  myHeaders.append("x-api-key", "apiKey");
  myHeaders.append("Content-Type", "application/json");
  const raw = JSON.stringify(body);

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
  };

  return fetch(`${apiUrl}${pathNames.RESET_PASSWORD}`, requestOptions)
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
      return error;
    });
}

export async function postRegister(body: {
  name: string;
  email?: string;
  phoneNo?: string;
  password: string;
  countryCode?: string;
  isTermsAndCondition: boolean;
}): Promise<IBackendResponse<any>> {
  const myHeaders = new Headers();
  myHeaders.append("accept", "*/*");
  myHeaders.append("Content-Language", "en");
  myHeaders.append("x-api-key", "apiKey");
  myHeaders.append("Content-Type", "application/json");
  const raw = JSON.stringify(body);

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
  };

  return fetch(`${apiUrl}${pathNames.REGISTER}`, requestOptions)
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
      return error;
    });
}

export async function postVerifyOTP(body: {
  otp: string;
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

  return fetch(`${apiUrl}${pathNames.VERIFY_OTP}`, requestOptions)
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
      return error;
    });
}

export async function putResendOTP({
  isPhone,
}: {
  isPhone: boolean;
}): Promise<IBackendResponse<any>> {
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
    body: JSON.stringify({ isPhone }),
  };

  return fetch(`${apiUrl}${pathNames.RESEND_OTP}`, requestOptions)
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
      return error;
    });
}
