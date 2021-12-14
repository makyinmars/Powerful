import React from "react";
import { useAppSelector } from "../../app/hooks";
import { useGetUserQuery } from "../../app/services/userApi";
import ErrorQueryHandling from "../../components/errorQuery";
import UserInfo from "../../components/userInfo";

const UserIdPage = () => {
  const { user } = useAppSelector((state) => state.auth);

  const { data, isError, isLoading, isSuccess, error } = useGetUserQuery(
    user?.id ?? ""
  );

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
