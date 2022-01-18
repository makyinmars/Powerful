import { useForm, SubmitHandler } from "react-hook-form";
import { SiAddthis } from "react-icons/si";

import {
  useDeleteSetMutation,
  useGetAllSetsByExerciseIdQuery,
  useUpdateSetMutation,
  useCreateSetMutation,
} from "@/app/services/setApi";
import {
  EditSetRequest,
  CreateSetRequest,
} from "@/app/services/interfaces/setInterface";
import SuccessQueryHandling from "./successQuery";
import Spinner from "./spinner";

interface SetInfoProps {
  id: string;
}

const SetInfo = ({ id }: SetInfoProps) => {
  const { data, isLoading, isSuccess, refetch } =
    useGetAllSetsByExerciseIdQuery(id, {
      refetchOnMountOrArgChange: true,
    });

  const {
    register: registerCreateSet,
    handleSubmit: handleSubmitCreateSet,
    formState: { errors: errorsCreateSet },
  } = useForm<CreateSetRequest>();

  const [
    createSet,
    { isSuccess: isSuccessCreateSet, isLoading: isLoadingCreateSet },
  ] = useCreateSetMutation();

  const onCreateSetSubmit: SubmitHandler<CreateSetRequest> = async (data) => {
    try {
      data.exerciseId = id;
      await createSet(data).unwrap();
      refetch();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {data?.map((set, index) => (
        <ul key={index}>
          <SetInfoForm id={set.id} reps={set.reps} weight={set.weight} />
        </ul>
      ))}

      {/* Add set */}
      <form
        onSubmit={handleSubmitCreateSet(onCreateSetSubmit)}
        className="grid grid-cols-3 gap-4 p-1 mt-1 place-items-center "
      >
        <li>
          <input
            type="number"
            {...registerCreateSet("reps", {
              required: "Reps is required",
              valueAsNumber: true,
            })}
            className="text-center input-brand"
          />
          {errorsCreateSet.reps && (
            <span className="error-brand">{errorsCreateSet.reps.message}</span>
          )}
        </li>

        <li>
          <input
            type="number"
            {...registerCreateSet("weight", {
              required: "Reps is required",
              valueAsNumber: true,
            })}
            className="text-center input-brand"
          />
          {errorsCreateSet.weight && (
            <span className="error-brand">
              {errorsCreateSet.weight.message}
            </span>
          )}
        </li>

        <button type="submit">
          <SiAddthis className="text-2xl text-green-700 hover:text-green-900" />
        </button>
      </form>

      {/* Status */}
      {isSuccessCreateSet ? (
        <SuccessQueryHandling text="Set added successfully" />
      ) : null}
      {isLoadingCreateSet && <Spinner />}
    </>
  );
};

export default SetInfo;

interface SetInfoFormProps {
  id: string;
  reps: number;
  weight: number;
}

const SetInfoForm = ({ id, reps, weight }: SetInfoFormProps) => {
  const [updateSet, { isLoading, isError, isSuccess, isUninitialized }] =
    useUpdateSetMutation();
  // Delete set
  const [deleteSet] = useDeleteSetMutation();

  const {
    register: registerEditSet,
    handleSubmit: handleSubmitEditSet,
    formState: { errors: errorsEditSet },
  } = useForm<EditSetRequest>();

  const onEditSetSubmit: SubmitHandler<EditSetRequest> = async (data) => {
    try {
      data.id = id;
      await updateSet(data).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  const onDeleteSetHandler = async (e: any, setId: string) => {
    e.preventDefault();
    try {
      await deleteSet(setId).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form className="grid grid-cols-3 gap-4 p-1 bg-gray-100 mt-1 border border-green-900 rounded place-items-center">
        <li>
          <input
            type="number"
            {...registerEditSet("reps", { valueAsNumber: true })}
            className="text-center input-brand"
            defaultValue={reps}
          />
        </li>
        <li>
          <input
            type="number"
            {...registerEditSet("weight", { valueAsNumber: true })}
            className="text-center input-brand"
            defaultValue={weight}
          />
        </li>

        <li className="flex flex-col sm:flex-row">
          <button
            className="button-workout-info"
            type="submit"
            onClick={handleSubmitEditSet(onEditSetSubmit)}
          >
            Save
          </button>
          <button
            className="button-workout-info"
            type="submit"
            onClick={(e) => onDeleteSetHandler(e, id)}
          >
            Remove
          </button>
        </li>
      </form>
    </>
  );
};
