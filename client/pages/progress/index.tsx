import { useForm, SubmitHandler } from "react-hook-form";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { createProgress } from "../../app/features/progress/progressSlice";
import { CreateProgressRequest } from "../../app/services/interfaces/progressInterface";

const ProgressPage = () => {
  // Get user id
  const { user } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();

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
    console.log(image);

    dispatch(createProgress({ image, description, weight, userId }));
  };

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

            {/* Weight */}
            <label htmlFor="weight" className="label-brand">
              Weight
            </label>
            <input
              id="weight"
              type="number"
              {...register("weight", {
                required: "A description is required",
              })}
              className="input-brand"
            />

            {/* Submit */}
            <button type="submit" className="button-brand">
              Create progress
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ProgressPage;
