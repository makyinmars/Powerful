import { useProtectedMutation, useUserQuery } from "../../app/services/userApi";
import { useAppSelector } from "../../app/hooks";

const Test = () => {
  // const { data, error, isLoading, isFetching, isSuccess } =
  //   useUserQuery("boom");
  // console.log(isLoading);
  // console.log(data);
  // console.log(error);

  const id = useAppSelector((state) => state.auth.user?.id);

  const { data, error, isLoading, isFetching, isSuccess } = useUserQuery(
    id || ""
  );

  console.log(data);

  return (
    <>
      <div>
        {/* 

        <button onClick={() => attemptAccess()}>
          Make an authenticated request
        </button>
      */}
      </div>
      <div>
        {/*         {data ? (
          <>
            Data:
            <pre>{JSON.stringify(data, null, 2)}</pre>
          </>
        ) : error ? (
          <>
            Error: <pre>{JSON.stringify(error, null, 2)}</pre>
          </>
        ) : null}
*/}
      </div>
    </>
  );
};

export default Test;
