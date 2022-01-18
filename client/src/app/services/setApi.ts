import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import {
  Set,
  CreateSetRequest,
  EditSetRequest,
} from "./interfaces/setInterface";

export const setApi = createApi({
  reducerPath: "setApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.API_URL}/api/set`,
    prepareHeaders: (headers, { getState }) => {
      // By default, if we have a token in the store, let's use that for authenticated requests
      const token = (getState() as RootState).auth.token;

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Set"],
  endpoints: (builder) => ({
    createSet: builder.mutation<Set, CreateSetRequest>({
      query: ({ reps, weight, exerciseId }) => ({
        url: "",
        method: "POST",
        body: { reps, weight, exerciseId },
      }),
      invalidatesTags: ["Set"],
    }),
    getSet: builder.query<Set, string>({
      query: (id) => `/${id}`,
      providesTags: ["Set"],
    }),
    updateSet: builder.mutation<Set, EditSetRequest>({
      query: ({ id, reps, weight }) => ({
        url: `/${id}`,
        method: "PUT",
        body: { reps, weight },
      }),
      invalidatesTags: ["Set"],
    }),
    deleteSet: builder.mutation<void, string>({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Set"],
    }),
    getAllSetsByExerciseId: builder.query<Set[], string>({
      query: (exerciseId) => `/exercise/${exerciseId}`,
      providesTags: ["Set"],
    }),
  }),
});

export const {
  useCreateSetMutation,
  useGetSetQuery,
  useUpdateSetMutation,
  useDeleteSetMutation,
  useGetAllSetsByExerciseIdQuery,
} = setApi;
