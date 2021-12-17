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

      <h2 className="text-xl text-center title-brand">{data.name}</h2>

      {/* Add Exercise */}
      <div className="grid grid-cols-1 gap-2 p-2 m-2 bg-gray-200 shadow-lg shadow-brand-600 md:grid-cols-2 xl:grid-cols-3">
        {data.exercises?.map((exercise, index) => (
          <ul
            key={index}
            className="p-1 bg-gray-400 rounded shadow-xl shadow-gray-100"
          >
            <li className="flex flex-col items-center bg-green-400 title-brand">
              {exercise.name}
            </li>

            {/* Add Sets */}
            <li className="grid grid-cols-3 gap-3 p-1 font-bold text-gray-800 place-items-center">
              <h3>Reps</h3>
              <h3>Weight</h3>
              <h3>Edit</h3>
            </li>

            {exercise.sets?.map((set, index) => (
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
          </ul>
        ))}
      </div>
    </>
  );
};

export default WorkoutInfo;
