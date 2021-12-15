import React from "react";
import { useRouter } from "next/router";
import { useGetAllProgressByUserQuery } from "../../../app/services/progressApi";

const AllProgressByUserId = () => {
  const router = useRouter();

  const { userId } = router.query;

  const { data, isError, isLoading, isSuccess, error } =
    useGetAllProgressByUserQuery(userId as string);

  console.log(data);
  return (
    <>
      <h1 className="heading-brand">Your progress history</h1>

      <div className="flex justify-center">
        <button className="button-brand w-auto">Create a new progress</button>
      </div>

      <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2">
          {data?.map((progress, index) => (
            <div key={index} className="">
              <div className="">
                <img
                  className="w-96 h-60 rounded-3xl"
                  src={progress.picture}
                  alt={progress.description}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AllProgressByUserId;
