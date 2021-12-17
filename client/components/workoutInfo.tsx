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

      <h2 className="title-brand text-center">{data.name}</h2>
      {/* Add Exercise */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 bg-red-400">
        {data.exercises?.map((exercise, index) => (
          <ul
            key={index}
            className="flex flex-col sm:flex-row justify-center items-center shadow shadow-lg"
          >
            <li>{exercise.name}</li>
          </ul>
        ))}
      </div>

      {/* Add Sets  */}
    </>
  );
};

export default WorkoutInfo;
