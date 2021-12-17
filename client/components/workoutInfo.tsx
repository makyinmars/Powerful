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
  const id = data.id;
  const userId = data.userId;

  return (
    <>
      <h1 className="heading-brand">Workout Information</h1>

      {/* Add Exercise */}
      <div className="flex flex-col sm:flex-row bg-red-400">
        <h2 className="text-center">{data.name}</h2>
      </div>

      {/* Add Sets  */}
    </>
  );
};

export default WorkoutInfo;
