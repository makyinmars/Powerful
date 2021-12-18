import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import { Workout } from "../app/services/interfaces/workoutInterface";
import { CreateExerciseRequest } from "../app/services/interfaces/exerciseInterface";
import { useGetExerciseQuery } from "../app/services/exerciseApi";
import {
  useCreateExerciseMutation,
  useGetAllExercisesByWorkoutIdQuery,
  useDeleteExerciseMutation,
} from "../app/services/exerciseApi";
import Spinner from "./spinner";
import ErrorQueryHandling from "./errorQuery";
import { useGetAllSetsByExerciseIdQuery } from "../app/services/setApi";
import SetInfo from "./setInfo";

interface WorkoutInfoProps {
  data: Workout;
  isLoading: boolean;
  isError: boolean;
  error: any;
}

const WorkoutInfo = ({ data, isLoading, isError, error }: WorkoutInfoProps) => {
  // Get the workout id from data
  const { id, userId } = data;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateExerciseRequest>();

  const [
    createExercise,
    {
      isLoading: isExerciseLoading,
      isError: isExerciseError,
      error: exerciseError,
    },
  ] = useCreateExerciseMutation();

  const onCreateExerciseSubmit: SubmitHandler<CreateExerciseRequest> = async (
    data
  ) => {
    data.workoutId = id;
    await createExercise(data).unwrap();
  };

  const { data: dataExercises } = useGetAllExercisesByWorkoutIdQuery(id, {
    refetchOnMountOrArgChange: true,
  });

  return (
    <>
      <h1 className="heading-brand">Workout Information</h1>

      <h2 className="text-xl text-center title-brand">{data.name}</h2>

      {/* Add exercise */}
      <div className="container-brand">
        <div className="form-brand-container">
          <h2 className="text-xl text-center title-brand">Add exercise</h2>
          <form
            className="form-brand"
            onSubmit={handleSubmit(onCreateExerciseSubmit)}
          >
            {/* Exercise Name */}
            <label htmlFor="name" className="label-brand">
              Exercise Name
            </label>
            <input
              type="text"
              id="name"
              {...register("name", { required: "Exercise name is required" })}
              className="input-brand"
            />
            {errors.name && (
              <span className="error-brand">{errors.name.message}</span>
            )}

            {/* Submit */}
            <button type="submit" className="button-brand">
              Add new exercise
            </button>

            {/* Status */}
            {isExerciseLoading && <Spinner />}
            {isExerciseError ? (
              <ErrorQueryHandling error={exerciseError} />
            ) : null}
          </form>
        </div>
      </div>

      {/* Exercise Information */}
      <div className="grid grid-cols-1 gap-2 p-2 m-2 bg-gray-200 shadow-lg shadow-brand-600 md:grid-cols-2 xl:grid-cols-3">
        {dataExercises?.map((exercise, index) => (
          <ul
            key={index}
            className="p-1 bg-gray-400 rounded shadow-xl shadow-gray-100"
          >
            <li className="flex justify-center bg-green-400 items-around title-brand">
              {exercise.name}
            </li>

            {/* Add Sets */}
            <li className="grid grid-cols-3 gap-3 p-1 font-bold text-gray-800 place-items-center">
              <h3>Reps</h3>
              <h3>Weight</h3>
              <h3>Edit</h3>
            </li>

            <SetInfo exerciseId={exercise.id} />
          </ul>
        ))}
      </div>
    </>
  );
};

export default WorkoutInfo;
