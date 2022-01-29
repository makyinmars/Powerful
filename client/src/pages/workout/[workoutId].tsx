import React, { useEffect } from "react";
import { useRouter } from "next/router";

import { useAppSelector } from "@/app/hooks";
import { useGetWorkoutQuery } from "@/app/services/workoutApi";
import WorkoutInfo from "@/components/workoutInfo";
import ErrorQueryHandling from "@/components/errorQuery";

const WorkoutIdPage = () => {
  const router = useRouter();

  const { user } = useAppSelector((state) => state.auth);

  const { workoutId } = router.query;

  const { data, isError, isLoading, error } = useGetWorkoutQuery(
    workoutId as string,
    { refetchOnMountOrArgChange: true }
  );

  useEffect(() => {
    if (user === null) {
      router.push("/");
    }
  }, [user, router]);

  return (
    <>
      {data ? (
        <WorkoutInfo
          data={data}
          isError={isError}
          isLoading={isLoading}
          error={error}
        />
      ) : isError ? (
        <ErrorQueryHandling error={error} />
      ) : null}
    </>
  );
};

export default WorkoutIdPage;
