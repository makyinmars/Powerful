import React from "react";
import { useRouter } from "next/router";

import ProgressInfo from "../../components/progressInfo";
import ErrorQueryHandling from "../../components/errorQuery";
import { useGetProgressQuery } from "../../app/services/progressApi";

const ProgressIdPage = () => {
  const router = useRouter();

  const { progressId } = router.query;

  const { data, isError, isLoading, error } = useGetProgressQuery(
    progressId as string,
    { refetchOnMountOrArgChange: true }
  );

  return (
    <>
      {data ? (
        <ProgressInfo
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

export default ProgressIdPage;
