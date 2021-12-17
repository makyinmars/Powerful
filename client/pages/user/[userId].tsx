import React, { useEffect } from "react";
import { useRouter } from "next/router";

import { useAppSelector } from "../../app/hooks";
import { useGetUserQuery } from "../../app/services/userApi";
import ErrorQueryHandling from "../../components/errorQuery";
import UserInfo from "../../components/userInfo";

const UserIdPage = () => {
  const router = useRouter();

  const { user } = useAppSelector((state) => state.auth);

  const { data, isError, isLoading, error } = useGetUserQuery(
    user?.id as string
  );

  useEffect(() => {
    if (user === null) {
      router.push("/");
    }
  }, [router, user]);

  return (
    <>
      {data ? (
        <UserInfo
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

export default UserIdPage;
