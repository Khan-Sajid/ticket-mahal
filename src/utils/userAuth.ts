import { IUserCompleteDetails } from "@/interfaces";
import { deleteCookie, getCookie, setCookie } from "cookies-next";

export const loginCookieName = "tku";
export const loginRefreshToken = "rtku";
export const domain = process.env.NEXT_PUBLIC_DOMAIN;

export function getUserDetail() {
  const loginDetails = getCookie(loginCookieName);
  if (loginDetails) return JSON.parse(loginDetails);
  return undefined;
}

export const getSession = () => {
  const loginDetails = getCookie(loginCookieName);
  if (loginDetails) return JSON.parse(loginDetails).session;
  return undefined;
};

export const getRefereshToken = (): string | undefined => {
  const refreshToken = getCookie(loginRefreshToken);
  if (refreshToken) return JSON.parse(refreshToken);
};

export function login(data: IUserCompleteDetails) {
  const loginPayload = getLoginPayload(data);
  const refreshToken = extractRefreshToken(data);
  if (loginPayload) {
    setCookie(loginCookieName, JSON.stringify(loginPayload), {
      //Expires after 90 days.
      expires: new Date(new Date().setDate(new Date().getDate() + 90)),
      domain,
    });
  }
  if (refreshToken) {
    setCookie(loginRefreshToken, JSON.stringify(refreshToken));
  }
}

export function logout() {
  deleteCookie(loginCookieName, { domain });
  localStorage.removeItem(loginRefreshToken);
}

export function getLoginPayload(data: IUserCompleteDetails) {
  if (!data) return undefined;
  const payload: any = {};
  payload["_id"] = data._id;
  payload["name"] = data.name;
  payload["email"] = data.email;
  payload["phoneNo"] = data.phoneNo;
  payload["session"] = data.accessToken || getSession();
  payload["profilePic"] = data.profilePic;
  payload["isEmailVerified"] = data.isEmailVerified;
  payload["isPhoneNoVerified"] = data.isPhoneNoVerified;
  payload["isSubscribed"] = data.isSubscribed;
  return payload;
}

function extractRefreshToken(data: IUserCompleteDetails) {
  if (!data) return undefined;
  return data.refreshToken;
}
