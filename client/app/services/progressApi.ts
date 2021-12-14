import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import {
  Progress,
  CreateProgressRequest,
} from "./interfaces/progressInterface";

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
    createProgress: builder.mutation<Progress, FormData>({
      query: (body) => ({
        url: "",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Progress"],
    }),
  }),
});

export const { useCreateProgressMutation } = progressApi;
