"use server";

import { cookies } from "next/headers";
import {
  getLoginPayload,
  loginCookieName,
  loginRefreshToken,
} from "./userAuth";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL; // Replace with your API URL

export async function fetchOnServerWithAuth(url: string, options: any = {}) {
  const cookiesData = await cookies();
  const loginCookieData = cookiesData.get(loginCookieName)?.value;
  const refreshCookieData = cookiesData.get(loginRefreshToken)?.value;
  let accessToken = undefined;
  let refreshToken = undefined;
  if (refreshCookieData) refreshToken = JSON.parse(refreshCookieData);
  if (loginCookieData) accessToken = JSON.parse(loginCookieData).session;
  // Add Authorization header with the access token
  const headers = {
    ...options.headers,
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
  };

  // Make the API request
  let response = await fetch(BASE_URL + url, {
    ...options,
    headers,
  });

  // If the access token is expired
  if (response.status === 401 && refreshToken) {
    // Attempt to refresh the token
    const tokenRefreshResponse = await fetch(
      `${BASE_URL}/users/authentications/refresh`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken }),
      }
    );

    if (tokenRefreshResponse.ok) {
      const { accessToken: newAccessToken } = await tokenRefreshResponse.json();
      const response = await tokenRefreshResponse.json();
      const cookiePayload = getLoginPayload(response);

      // Save the new token
      cookiesData.set(loginCookieName, cookiePayload);

      // Retry the original request with the new token
      return fetchOnServerWithAuth(url, {
        ...options,
        headers: {
          ...options.headers,
          Authorization: `Bearer ${newAccessToken}`,
        },
      });
    } else {
      // Handle refresh token failure (e.g., logout user)
      console.error("Failed to refresh token. Logging out...");
      cookiesData.delete(loginCookieName);
      cookiesData.delete(loginRefreshToken);
      //   window.location.href = "/login";
      throw new Error("Unauthorized. Please log in again.");
    }
  }
  return response;
}
