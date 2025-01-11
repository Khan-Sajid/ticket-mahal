
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IHeader } from '@/interfaces';
import { Categories } from '@/interfaces/categories';
const apiEndPoint = process.env.NEXT_PUBLIC_API_BASE_URL;
const Header: IHeader = {
  "X-RapidAPI-Key": "6b365afe7cmsh5548dfde4720349p10e88bjsn3c9175ff3429",
  "X-RapidAPI-Host": "car-data.p.rapidapi.com",
};
export const categoriesApi = createApi({
  reducerPath: 'categoriesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: apiEndPoint,
    prepareHeaders: (headers) => {
      headers.set("X-RapidAPI-Key", Header["X-RapidAPI-Key"]);
      headers.set("X-RapidAPI-Host", Header["X-RapidAPI-Host"]);
      return headers;
    },
  }),
  tagTypes: ['categories'],
  endpoints: (builder) => ({
    getCategories: builder.query<Categories, void>({
      query: () => 'categories',
      providesTags: ['categories']
    }),
  }),
});

export const { useGetCategoriesQuery } = categoriesApi;
