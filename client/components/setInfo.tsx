import { useForm, SubmitHandler } from "react-hook-form";
import { SiAddthis } from "react-icons/si";

import {
  useGetAllSetsByExerciseIdQuery,
  useDeleteSetMutation,
  useUpdateSetMutation,
} from "../app/services/setApi";
import {
  EditSetRequest,
  CreateSetRequest,
} from "../app/services/interfaces/setInterface";

interface SetInfoProps {
  exerciseId: string;
}

const SetInfo = ({ exerciseId }: SetInfoProps) => {
  // console.log(exerciseId);
  const { data } = useGetAllSetsByExerciseIdQuery(exerciseId);

  // Update set
  const [updateSet] = useUpdateSetMutation();

  // Delete set
  const [deleteSet] = useDeleteSetMutation();

  const {
    register: registerCreateSet,
    handleSubmit: handleSubmitCreateSet,
    formState: { errors: errorsCreateSet },
  } = useForm<CreateSetRequest>();

  const {
    register: registerEditSet,
    handleSubmit: handleSubmitEditSet,
    formState: { errors: errorsEditSet },
  } = useForm<EditSetRequest>();

  const onCreateSetSubmit: SubmitHandler<CreateSetRequest> = async (data) => {
    console.log(data);
  };

  const onEditSetSubmit: SubmitHandler<EditSetRequest> = async (data) => {
    try {
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

  console.log(data);

  return (
    <>
      <form>
        {data?.map((set, index) => (
          <ul
            key={index}
            className="grid grid-cols-3 p-1 mt-1 border border-green-900 rounded place-items-center"
          >
            {/* Item hidden to get id of set id and remove from dom*/}
            <li className="hidden">
              <input
                type="text"
                {...registerEditSet("id")}
                defaultValue={set.id}
              />
            </li>
            <li>
              <input
                type="number"
                {...registerEditSet("reps", {
                  required: "Reps is required",
                  valueAsNumber: true,
                })}
                className="text-center input-brand"
                defaultValue={set.reps}
              />
            </li>
            <li>
              <input
                type="number"
                {...registerEditSet("weight", {
                  required: "Weight is required",
                  valueAsNumber: true,
                })}
                className="text-center input-brand"
                defaultValue={set.weight}
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
                onClick={(e) => onDeleteSetHandler(e, set.id)}
              >
                Remove
              </button>
            </li>
          </ul>
        ))}
      </form>

      {/* Add set */}
      <div>
        <button>
          <SiAddthis className="text-2xl text-green-700" />
        </button>
      </div>
    </>
  );
};

export default SetInfo;
