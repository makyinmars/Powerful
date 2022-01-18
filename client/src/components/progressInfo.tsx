import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/router";

import Spinner from "./spinner";
import ErrorQueryHandling from "./errorQuery";
import SuccessQueryHandling from "./successQuery";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { useDeleteProgressMutation } from "@/app/services/progressApi";
import { updateProgress } from "@/app/features/progress/progressSlice";
import {
  EditProgressRequest,
  Progress,
} from "../app/services/interfaces/progressInterface";
import HeadPage from "./headPage";

interface ProgressInfoProps {
  data: Progress;
  isLoading: boolean;
  isError: boolean;
  error: any; // Expected to be a { status: 2xx, message: error message }
}

const ProgressInfo = ({
  data,
  isLoading,
  isError,
  error,
}: ProgressInfoProps) => {
  // Get the progress id from data
  const id = data.id;
  const userId = data.userId;

  const dispatch = useAppDispatch();

  const { isSuccess: isSuccessUpdate } = useAppSelector(
    (state) => state.progress.progressStatus
  );

  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<EditProgressRequest>();

  // Delete progress mutation by id
  const [deleteProgress] = useDeleteProgressMutation();

  const onUpdateProgressSubmit: SubmitHandler<EditProgressRequest> = async (
    data
  ) => {
    try {
      const { description, weight } = data;
      const image = data.image[0];
      await dispatch(
        updateProgress({ id, image, description, weight, userId })
      );
    } catch (error) {
      console.log(error);
    }
  };

  const onDeleteProgressSubmit: SubmitHandler<
    EditProgressRequest
  > = async () => {
    try {
      await deleteProgress(id);
      router.push(`/progress/user/${data.userId}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <HeadPage title={data.description} />
      <h1 className="heading-brand">Progress Information</h1>

      <div className="container-brand">
        <div className="form-brand-container">
          {/* Displays Current Image */}

          <p className="title-brand">Current image</p>
          <div className="flex justify-center p-1 rounded">
            <img
              className="h-auto mb-2 rounded w-80"
              src={data.picture}
              alt={data.description}
            />
          </div>

          <form className="form-brand">
            {/* Image */}
            <label htmlFor="image" className="label-brand">
              Image
            </label>
            <input type="file" {...register("image")} className="input-brand" />

            {/* Description */}
            <label htmlFor="description" className="label-brand">
              Description
            </label>
            <textarea
              rows={2}
              cols={30}
              {...register("description")}
              className="input-brand"
              defaultValue={data.description}
            />

            {/* Weight */}
            <label htmlFor="weight" className="label-brand">
              Weight
            </label>
            <input
              type="number"
              {...register("weight")}
              className="input-brand"
              defaultValue={data.weight}
            />

            {/* Submit */}
            <button
              className="button-brand"
              type="submit"
              onClick={handleSubmit(onUpdateProgressSubmit)}
            >
              Update progress
            </button>
            <button
              className="button-brand"
              type="submit"
              onClick={handleSubmit(onDeleteProgressSubmit)}
            >
              Delete progress
            </button>

            {isLoading && <Spinner />}
            {isError ? <ErrorQueryHandling error={error} /> : null}
            {isSuccessUpdate && (
              <SuccessQueryHandling text="Progress information updated" />
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default ProgressInfo;
