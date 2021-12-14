import React from "react";

import { useAppSelector } from "../../app/hooks";
import {
  getRunningOperationPromises,
  useGetUserQuery,
} from "../../app/services/userApi";
import { getUser } from "../../app/services/userApi";
import ErrorQueryHandling from "../../components/errorQuery";
import UserInfo from "../../components/userInfo";

import { wrapper } from "../../app/store";

const UserId = () => {
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

export default UserId;

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const userId = context.params?.userId;
    if (typeof userId === "string") {
      store.dispatch(getUser.initiate(userId));
    }

    await Promise.all(getRunningOperationPromises());

    return {
      props: {},
    };
  }
);
