import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import {
  Exercise,
  CreateExerciseRequest,
  EditExerciseRequest,
} from "./interfaces/exerciseInterface";

export const exerciseApi = createApi({
  reducerPath: "exerciseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.API_URL}/api/exercise`,
    prepareHeaders: (headers, { getState }) => {
      // By default, if we have a token in the store, let's use that for authenticated requests
      const token = (getState() as RootState).auth.token;

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Exercise"],
  endpoints: (builder) => ({
    createExercise: builder.mutation<Exercise, CreateExerciseRequest>({
      query: ({ name, userId }) => ({
        url: "",
        method: "POST",
        body: { name, userId },
      }),
      invalidatesTags: ["Exercise"],
    }),
    getExercise: builder.query<Exercise, string>({
      query: (id) => `/${id}`,
      providesTags: ["Exercise"],
    }),
    getAllExercisesByUser: builder.query<Exercise[], string>({
      query: (userId) => `/user/${userId}`,
      providesTags: ["Exercise"],
    }),
    updateExercise: builder.mutation<Exercise, EditExerciseRequest>({
      query: ({ id, name, userId }) => ({
        url: `/${id}`,
        method: "PUT",
        body: { name, userId },
      }),
      invalidatesTags: ["Exercise"],
    }),
    deleteExercise: builder.mutation<void, string>({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Exercise"],
    }),
  }),
});

export const {
  useCreateExerciseMutation,
  useGetExerciseQuery,
  useGetAllExercisesByUserQuery,
  useUpdateExerciseMutation,
  useDeleteExerciseMutation,
} = exerciseApi;
