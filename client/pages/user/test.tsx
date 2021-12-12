import {
  useUserQuery,
  isFetchBaseQueryErrorType,
} from "../../app/services/userApi";
import { useAppSelector } from "../../app/hooks";
import ErrorHandling from "../../components/errorQuery";

const Test = () => {
  // const { data, error, isLoading, isFetching, isSuccess } =

  const { user } = useAppSelector((state) => state.auth);

  // If there is not user id, then fallback is ""
  const { data, isError, isLoading, isFetching, isSuccess, error } =
    useUserQuery(user?.id ?? "");

  return (
    <>
      {data ? (
        <>
          Data:
          <pre>{JSON.stringify(data, null, 4)}</pre>
        </>
      ) : isError ? (
        <ErrorHandling error={error} />
      ) : null}
    </>
  );
};

export default Test;
