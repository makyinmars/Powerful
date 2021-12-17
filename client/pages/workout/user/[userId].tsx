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

      <div className="container-workout-history">
        {data?.map((workout, index) => (
          <ul key={index} className="card-workout-history">
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
