import { useUserQuery } from "../../app/services/userApi";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { removeCredentials } from "../../app/features/auth/authSlice";
import ErrorHandling from "../../components/errorQuery";
import { useRouter } from "next/router";

const Test = () => {
  const { user } = useAppSelector((state) => state.auth);

  const router = useRouter();

  const dispatch = useAppDispatch();

  // If there is not user id, then fallback is ""
  const { data, isError, isLoading, isFetching, isSuccess, error } =
    useUserQuery(user?.id ?? "");

  const onLogoutHandler = () => {
    try {
      dispatch(removeCredentials());
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

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
      <button className="button-brand" onClick={onLogoutHandler}>
        Log out
      </button>
    </>
  );
};

export default Test;
