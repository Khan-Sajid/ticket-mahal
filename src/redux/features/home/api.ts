import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IHeader } from "@/interfaces";
import { HomeEvents } from "@/interfaces/home";
const apiEndPoint = process.env.NEXT_PUBLIC_API_BASE_URL;
const Header: IHeader = {
  "X-RapidAPI-Key": "6b365afe7cmsh5548dfde4720349p10e88bjsn3c9175ff3429",
  "X-RapidAPI-Host": "car-data.p.rapidapi.com",
};
export const eventsApi = createApi({
  reducerPath: "eventsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: apiEndPoint,
    prepareHeaders: (headers) => {
      headers.set("X-RapidAPI-Key", Header["X-RapidAPI-Key"]);
      headers.set("X-RapidAPI-Host", Header["X-RapidAPI-Host"]);
      return headers;
    },
  }),
  tagTypes: ["events"],
  keepUnusedDataFor: 6,
  endpoints: (builder) => ({
    getEvents: builder.query<HomeEvents,{ page: number; pageSize: number; meta?: string }>({
      query: ({ page, pageSize, meta }) => ({
        url: `events`,
        params: { page, pageSize },
        headers: { "X-Meta-Info": meta || "" }, // Custom header for meta info,
      }),
      keepUnusedDataFor: 5,
      providesTags: ["events"],
    }),
    getRecommendedEvents: builder.query({
      query: ({ page, pageSize }) =>({
        url: `events/recommended`,
        params: { page, pageSize },
      })
    }),
    getUpcomingEvents: builder.query({
      query: ({ page, pageSize }) =>({
        url: `events/upcoming`,
        params: { page, pageSize },
      })
    }),
    getPremiumEvents: builder.query({
      query: ({ page, pageSize }) =>({
        url: `events/premium`,
        params: { page, pageSize },
      })
    }),
    getPastEvents: builder.query({
      query: ({ page, pageSize }) =>
        `past-events?page=${page}&pageSize=${pageSize}`,
    }),
  }),
});

export const {
  useGetEventsQuery,
  useGetRecommendedEventsQuery,
  useGetUpcomingEventsQuery,
  useGetPremiumEventsQuery,
} = eventsApi;
