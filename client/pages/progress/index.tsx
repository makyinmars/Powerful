import { useEffect } from "react";
import { useRouter } from "next/router";
import { useForm, SubmitHandler } from "react-hook-form";

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  createProgress,
  clearProgressStatus,
} from "../../app/features/progress/progressSlice";
import { CreateProgressRequest } from "../../app/services/interfaces/progressInterface";
import Spinner from "../../components/spinner";

const ProgressPage = () => {
  // Get user id
  const { user } = useAppSelector((state) => state.auth);

  // Get progress status
  const { isLoading, isError, isSuccess, errorMessage } = useAppSelector(
    (state) => state.progress.progressStatus
  );
  const { id } = useAppSelector((state) => state.progress.currentProgress);

  const dispatch = useAppDispatch();

  const router = useRouter();

  const userId: string = user?.id as string;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CreateProgressRequest>();

  const onProgressSubmit: SubmitHandler<CreateProgressRequest> = (data) => {
    const { description, weight } = data;
    const image = data.image[0];

    dispatch(createProgress({ image, description, weight, userId }));
  };

  useEffect(() => {
    if (user === null) {
      router.push("/");
    }
    if (isSuccess) {
      router.push(`/progress/${id}`);
      dispatch(clearProgressStatus());
    }
  }, [router, user, id, isSuccess, dispatch]);

  return (
    <>
      <h1 className="heading-brand">Create a new progress</h1>
      <p className="text-center">
        Tracking your body progress is important because it lets you see how you
        are progressing in terms of reaching your previously set goals.
      </p>
      <div className="container-brand">
        <div className="form-brand-container">
          <form
            onSubmit={handleSubmit(onProgressSubmit)}
            className="form-brand"
          >
            {/*Image */}
            <label htmlFor="image" className="label-brand">
              Image
            </label>
            <input
              id="image"
              type="file"
              {...register("image", { required: "An image is required" })}
              className="input-brand"
            />
            {errors.image && (
              <span className="error-brand">{errors.image.message}</span>
            )}

            {/* Description */}
            <label htmlFor="description" className="label-brand">
              Description
            </label>
            <textarea
              id="description"
              rows={5}
              {...register("description", {
                required: "A description is required",
              })}
              className="input-brand"
            />
            {errors.description && (
              <span className="error-brand">{errors.description.message}</span>
            )}

            {/* Weight */}
            <label htmlFor="weight" className="label-brand">
              Weight
            </label>
            <input
              id="weight"
              type="number"
              {...register("weight", {
                required: "Weight is required",
                min: {
                  value: 30,
                  message: "Minimum weight should be more 30",
                },
              })}
              className="input-brand"
            />
            {errors.weight && (
              <span className="error-brand">{errors.weight.message}</span>
            )}

            {/* Submit */}
            <button type="submit" className="button-brand">
              Create progress
            </button>

            {/* Progress status */}
            {isLoading && <Spinner />}
            {isError && <p className="error-handling">{errorMessage}</p>}
          </form>
        </div>
      </div>
    </>
  );
};

export default ProgressPage;
