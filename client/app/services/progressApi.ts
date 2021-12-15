import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { Progress } from "./interfaces/progressInterface";

export const progressApi = createApi({
  reducerPath: "progressApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.API_URL}/api/progress`,

    prepareHeaders: (headers, { getState }) => {
      // By default, if we have a token in the store, let's use that for authenticated requests
      const token = (getState() as RootState).auth.token;

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Progress"],
  endpoints: (builder) => ({
    getProgress: builder.query<Progress, string>({
      query: (id) => `/${id}`,
      providesTags: ["Progress"],
    }),
    getAllProgressByUser: builder.query<Progress[], string>({
      query: (userId) => `/user/${userId}`,
    }),
  }),
});

export const { useGetProgressQuery, useGetAllProgressByUserQuery } =
  progressApi;
