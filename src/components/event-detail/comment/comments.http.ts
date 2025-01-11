import { getSession } from "@/utils/userAuth";
import { ICommentPayload } from "./comments.types";
import { IBackendResponse } from "@/interfaces";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const pathNames = {
  postFeedback: "/api/v1/web/feedbacks",
  getFeedbacks: "/api/v1/web/feedbacks",
};
export async function getFeedbacks({
  id,
  limit = 10,
  page = 1,
}: {
  id: string;
  limit?: number;
  page?: number;
}): Promise<IBackendResponse<any>> {
  const myHeaders = new Headers();
  const token = getSession();
  if (token) myHeaders.append("Authorization", `Bearer ${token}`);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
  };

  const params = new URLSearchParams();
  if (id) params.set("eventId", id);
  params.set("limit", limit.toString());
  params.set("page", page.toString());

  return fetch(`${apiUrl}${pathNames.getFeedbacks}?${params}`, requestOptions)
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
      return error;
    });
}

export async function giveFeedback(
  data: ICommentPayload
): Promise<IBackendResponse<any>> {
  const myHeaders = new Headers();
  const raw = JSON.stringify(data);
  myHeaders.append("Authorization", `Bearer ${getSession()}`);

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
  };

  return fetch(`${apiUrl}${pathNames.postFeedback}`, requestOptions)
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
      return error;
    });
}
