import { deleteCookie, getCookie, setCookie } from "cookies-next";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL; // Replace with your API URL

export async function fetchWithAuth(url: string, options: any = {}) {
  let accessToken = getCookie("accessToken");
  const refreshToken = getCookie("refreshToken");

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

      // Save the new token
      setCookie("accessToken", newAccessToken);

      // Retry the original request with the new token
      return fetchWithAuth(url, {
        ...options,
        headers: {
          ...options.headers,
          Authorization: `Bearer ${newAccessToken}`,
        },
      });
    } else {
      // Handle refresh token failure (e.g., logout user)
      console.error("Failed to refresh token. Logging out...");
      deleteCookie("accessToken");
      deleteCookie("refreshToken");
      //   window.location.href = "/login";
      throw new Error("Unauthorized. Please log in again.");
    }
  }
  return response;
}
