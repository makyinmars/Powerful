import { useForm, SubmitHandler } from "react-hook-form";
import { FaTrashAlt } from "react-icons/fa";

import { Workout } from "@/app/services/interfaces/workoutInterface";
import { CreateExerciseRequest } from "@/app/services/interfaces/exerciseInterface";
import {
  useCreateExerciseMutation,
  useGetAllExercisesByWorkoutIdQuery,
  useDeleteExerciseMutation,
} from "@/app/services/exerciseApi";
import Spinner from "./spinner";
import ErrorQueryHandling from "./errorQuery";
import SetInfo from "./setInfo";
import HeadPage from "./headPage";
import SuccessQueryHandling from "./successQuery";

interface WorkoutInfoProps {
  data: Workout;
  isLoading: boolean;
  isError: boolean;
  error: any;
}

const WorkoutInfo = ({ data, isLoading, isError, error }: WorkoutInfoProps) => {
  // Get the workout id from data
  const { id } = data;

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
      isSuccess: isExerciseSuccess,
    },
  ] = useCreateExerciseMutation();

  const onCreateExerciseSubmit: SubmitHandler<CreateExerciseRequest> = async (
    data
  ) => {
    data.workoutId = id;
    await createExercise(data).unwrap();
  };

  const {
    data: dataExercises,
    isError: isErrorGetAllExercises,
    isLoading: isLoadingGetAllExercises,
    error: errorGetAllExercises,
    refetch,
  } = useGetAllExercisesByWorkoutIdQuery(id, {
    refetchOnMountOrArgChange: true,
  });

  const [deleteExercise] = useDeleteExerciseMutation();

  // Removes exercise from the list
  const onDeleteExerciseHandler = async (exerciseId: string) => {
    try {
      await deleteExercise(exerciseId).unwrap();
      refetch();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <HeadPage title={data.name} />

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

            {/* Check if array is not empty */}
            {isExerciseSuccess ? (
              <SuccessQueryHandling text="Exercise added successfully" />
            ) : null}

            {isExerciseLoading && <Spinner />}
            {isExerciseError ? (
              <ErrorQueryHandling error={exerciseError} />
            ) : null}
          </form>
        </div>
      </div>

      {/* Exercise Information */}
      <div className="grid grid-cols-1 gap-4 p-2 m-2 md:grid-cols-2 xl:grid-cols-3">
        {dataExercises ? (
          <>
            {dataExercises.map((exercise, index) => (
              <ul
                key={index}
                className="p-1 my-1 bg-zinc-300 border border-solid rounded"
              >
                <li className="flex justify-center items-around">
                  <h2 className="flex-1 text-center title-brand">
                    {exercise.name}
                  </h2>
                  <button onClick={() => onDeleteExerciseHandler(exercise.id)}>
                    <FaTrashAlt size="18" className="mr-3 text-red-600" />
                  </button>
                </li>

                {/* Add Sets */}
                <li className="grid grid-cols-3 gap-3 p-1 font-bold text-gray-800 place-items-center">
                  <h3>Reps</h3>
                  <h3>Weight</h3>
                  <h3>Edit</h3>
                </li>

                {/* Information for Sets */}
                <SetInfo id={exercise.id} />
              </ul>
            ))}
          </>
        ) : null}
      </div>

      {isErrorGetAllExercises ? (
        <ErrorQueryHandling error={errorGetAllExercises} />
      ) : null}
    </>
  );
};

export default WorkoutInfo;
