import React from "react";
import { useRouter } from "next/router";
import { useGetProgressQuery } from "../../app/services/progressApi";

const ProgressIdPage = () => {
  const router = useRouter();

  const { progressId } = router.query;

  const { data, isError, isLoading, isSuccess, error } = useGetProgressQuery(
    progressId as string
  );

  console.log(data);

  return (
    <>
      <h1>Progress</h1>
    </>
  );
};

export default ProgressIdPage;
