import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { useAppSelector } from "../../../app/hooks";
import { useGetAllWorkoutsByUserQuery } from "../../../app/services/workoutApi";
import SuccessQueryHandling from "../../../components/successQuery";
import Spinner from "../../../components/spinner";
import HeadPage from "../../../components/headPage";

const AllWorkoutsByUserId = () => {
  const router = useRouter();

  const { userId } = router.query;

  const { user } = useAppSelector((state) => state.auth);

  const { data, isError, isLoading, isSuccess, error } =
    useGetAllWorkoutsByUserQuery(userId as string, {
      refetchOnMountOrArgChange: true,
    });

  useEffect(() => {
    if (user === null) {
      router.push("/");
    }
  }, [user, router]);

  return (
    <>
      <HeadPage title="Workout history" />
      <h1 className="heading-brand">Workout History</h1>

      <div className="flex justify-center">
        <button className="button-brand w-auto animation-text">
          <Link href="/workout">Create a new workout</Link>
        </button>
      </div>

      <div className="container-workout-history">
        {data?.map((workout, index) => (
          <ul key={index} className="card-workout-history">
            <li className="subheading-brand my-2">{workout.name}</li>
            <li>
              <button className="button-brand w-auto h-10">
                <Link href={`/workout/${workout.id}`}>Edit workout</Link>
              </button>
            </li>
          </ul>
        ))}
      </div>

      {/* Status */}
      {isLoading && <Spinner />}

      {/* Check if array is not empty */}
      {isSuccess && data?.length !== 0 ? (
        <SuccessQueryHandling text="Workout history loaded successfully" />
      ) : (
        <SuccessQueryHandling text="Workout history is empty" />
      )}
    </>
  );
};

export default AllWorkoutsByUserId;
