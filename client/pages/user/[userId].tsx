import React from "react";

import { useAppSelector } from "../../app/hooks";
import { useUserQuery } from "../../app/services/userApi";
import ErrorQueryHandling from "../../components/errorQuery";
import UserInfo from "../../components/userInfo";

const UserId = () => {
  const { user } = useAppSelector((state) => state.auth);

  const { data, isError, isLoading, isSuccess, error } = useUserQuery(
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

export default UserId;
