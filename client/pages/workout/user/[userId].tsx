import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { useGetAllWorkoutsByUserQuery } from "../../../app/services/workoutApi";
import SuccessQueryHandling from "../../../components/successQuery";
import Spinner from "../../../components/spinner";
import ErrorQueryHandling from "../../../components/errorQuery";

const AllWorkoutsByUserId = () => {
  const router = useRouter();

  const { userId } = router.query;

  const { data, isError, isLoading, isSuccess, error } =
    useGetAllWorkoutsByUserQuery(userId as string, {
      refetchOnMountOrArgChange: true,
    });

  return (
    <>
      <h1 className="heading-brand">Workout History</h1>

      <div className="flex justify-center">
        <button className="button-brand w-auto">
          <Link href="/workout">Create a new workout</Link>
        </button>
      </div>

      {/* Status */}
      {isLoading && <Spinner />}
      {isError ? <ErrorQueryHandling error={error} /> : null}

      {/* Check if array is not empty */}
      {isSuccess && data?.length !== 0 ? (
        <SuccessQueryHandling text="Workout history loaded successfully" />
      ) : (
        <SuccessQueryHandling text="Workout history is empty" />
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
        {data?.map((workout, index) => (
          <ul
            key={index}
            className="flex flex-col justify-center items-center bg-gray-200 shadow 
            shadow-xl shadow-brand-600 rounded flex-wrap p-2 mx-2"
          >
            <li className="title-brand my-2">{workout.name}</li>
            <li>
              <button className="button-brand w-auto h-10">
                <Link href={`/workout/${workout.id}`}>Edit workout</Link>
              </button>
            </li>
          </ul>
        ))}
      </div>
    </>
  );
};

export default AllWorkoutsByUserId;
