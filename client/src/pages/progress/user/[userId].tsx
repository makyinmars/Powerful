import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";

import { useAppSelector } from "@/app/hooks";
import { useGetAllProgressByUserQuery } from "@/app/services/progressApi";
import SuccessQueryHandling from "@/components/successQuery";
import Spinner from "@/components/spinner";
import ErrorQueryHandling from "@/components/errorQuery";
import HeadPage from "@/components/headPage";

const AllProgressByUserId = () => {
  const router = useRouter();

  const { user } = useAppSelector((state) => state.auth);

  const { userId } = router.query;

  const { data, isError, isLoading, isSuccess, error } =
    useGetAllProgressByUserQuery(userId as string, {
      refetchOnMountOrArgChange: true,
    });

  useEffect(() => {
    if (user === null) {
      router.push("/");
    }
  }, [user, router]);

  return (
    <>
      <HeadPage title="Progress history" />
      <h1 className="heading-brand">Your progress history</h1>

      <div className="flex justify-center">
        <button className="w-auto button-brand">
          <Link href="/progress">Create a new progress</Link>
        </button>
      </div>

      <div className="container-brand-card">
        <div className="card-brand">
          {data?.map((progress, index) => (
            <div key={index} className="p-1 rounded bg-brand-600">
              <Image
                className="rounded"
                src={progress.picture}
                alt={progress.description}
                width={329}
                height={600}
              />
              <div className="card-brand-attributes">
                <div className="self-center">
                  <button className="button-brand">
                    <Link href={`/progress/${progress.id}`}>Edit progress</Link>
                  </button>
                </div>
                <div className="justify-self-center">
                  <h2 className="subheading-brand">Weight</h2>
                  <p className="text-zinc-900">{progress.weight} lbs</p>
                </div>
              </div>
              <div className="card-brand-description">
                <h2 className="text-lg font-bold">Description</h2>
                <p>{progress.description}</p>
              </div>
            </div>
          ))}
        </div>
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
    </>
  );
};

export default AllProgressByUserId;
