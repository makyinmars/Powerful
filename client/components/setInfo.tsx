import { useGetAllSetsByExerciseIdQuery } from "../app/services/setApi";

interface SetInfoProps {
  exerciseId: string;
}

const SetInfo = ({ exerciseId }: SetInfoProps) => {
  // console.log(exerciseId);
  const { data } = useGetAllSetsByExerciseIdQuery(exerciseId);
  return (
    <>
      {data?.map((set, index) => (
        <ul
          key={index}
          className="grid grid-cols-3 p-1 border place-items-center"
        >
          <li>{set.reps}</li>
          <li>{set.weight}</li>
          <li className="flex flex-col sm:flex-row">
            <button className="button-workout-info">Save</button>
            <button className="button-workout-info">Remove</button>
          </li>
        </ul>
      ))}
    </>
  );
};

export default SetInfo;
