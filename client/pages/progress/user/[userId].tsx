import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useGetAllProgressByUserQuery } from "../../../app/services/progressApi";
import SuccessQueryHandling from "../../../components/successQuery";
import Spinner from "../../../components/spinner";
import ErrorQueryHandling from "../../../components/errorQuery";

const AllProgressByUserId = () => {
  const router = useRouter();

  const { userId } = router.query;

  const { data, isError, isLoading, isSuccess, error } =
    useGetAllProgressByUserQuery(userId as string, {
      refetchOnMountOrArgChange: true,
    });

  return (
    <>
      <h1 className="heading-brand">Your progress history</h1>

      <div className="flex justify-center">
        <button className="button-brand w-auto">
          <Link href="/progress">Create a new progress</Link>
        </button>
      </div>

      {/* Status */}
      {isLoading && <Spinner />}
      {isError ? <ErrorQueryHandling error={error} /> : null}

      {/* Checks if array is not empty */}
      {isSuccess && data?.length !== 0 ? (
        <SuccessQueryHandling text="Progress history loaded successfully" />
      ) : (
        <SuccessQueryHandling text="Progress history is empty" />
      )}

      <div className="container-brand-card">
        <div className="card-brand">
          {data?.map((progress, index) => (
            <div key={index} className="p-1 bg-brand-600 rounded">
              <img
                className="w-80 h-80 rounded"
                src={progress.picture}
                alt={progress.description}
              />
              <div className="card-brand-attributes">
                <div className="self-center">
                  <button className="button-brand">
                    <Link href={`/progress/${progress.id}`}>Edit progress</Link>
                  </button>
                </div>
                <div className="justify-self-center">
                  <h2 className="title-brand">Weight</h2>
                  <p>{progress.weight} lbs</p>
                </div>
              </div>
              <div className="card-brand-description">
                <h2 className="font-bold text-lg">Description</h2>
                <p>{progress.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AllProgressByUserId;
