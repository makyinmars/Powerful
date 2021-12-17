import React from "react";
import { Workout } from "../app/services/interfaces/workoutInterface";

interface WorkoutInfoProps {
  data: Workout;
  isLoading: boolean;
  isError: boolean;
  error: any;
}

const WorkoutInfo = ({ data, isLoading, isError, error }: WorkoutInfoProps) => {
  // Get the workout id from data
  const { id, userId } = data;

  console.log(data);

  return (
    <>
      <h1 className="heading-brand">Workout Information</h1>

      <h2 className="text-center title-brand">{data.name}</h2>
      {/* Add Exercise */}
      <div className="grid grid-cols-1 gap-2 bg-red-400 md:grid-cols-2 xl:grid-cols-3">
        {data.exercises?.map((exercise, index) => (
          <ul
            key={index}
            className="flex flex-col justify-center shadow-lg md:flex-row"
          >
            <li className="self-center">{exercise.name}</li>
            <li className="justify-self-stretch">
              <h3>Weight</h3>
              <h3>Reps</h3>
            </li>
            {exercise.sets?.map((set, index) => (
              <ul key={index} className="grid grid-cols-3 grid-rows-1">
                <li>
                  <h3>Reps</h3>
                  <p>{set.reps}</p>
                </li>
                <li>
                  <h3>Weight</h3>
                  <p>{set.weight}</p>
                </li>
              </ul>
            ))}
          </ul>
        ))}
      </div>

      {/* Add Sets  */}
    </>
  );
};

export default WorkoutInfo;
