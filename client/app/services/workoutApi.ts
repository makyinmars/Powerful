import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import {
  Workout,
  CreateWorkoutRequest,
  EditWorkoutRequest,
} from "./interfaces/workoutInterface";

export const workoutApi = createApi({
  reducerPath: "workoutApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.API_URL}/api/workout`,
    prepareHeaders: (headers, { getState }) => {
      // By default, if we have a token in the store, let's use that for authenticated requests
      const token = (getState() as RootState).auth.token;

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Workout"],
  endpoints: (builder) => ({
    createWorkout: builder.mutation<Workout, CreateWorkoutRequest>({
      query: ({ name, userId }) => ({
        url: "",
        method: "POST",
        body: { name, userId },
      }),
      invalidatesTags: ["Workout"],
    }),
    getWorkout: builder.query<Workout, string>({
      query: (id) => `/${id}`,
      providesTags: ["Workout"],
    }),
    updateWorkout: builder.mutation<Workout, EditWorkoutRequest>({
      query: ({ id, name, userId }) => ({
        url: `/${id}`,
        method: "PUT",
        body: { name, userId },
      }),
      invalidatesTags: ["Workout"],
    }),
    deleteWorkout: builder.mutation<void, string>({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Workout"],
    }),
  }),
});

export const {
  useCreateWorkoutMutation,
  useGetWorkoutQuery,
  useUpdateWorkoutMutation,
  useDeleteWorkoutMutation,
} = workoutApi;
