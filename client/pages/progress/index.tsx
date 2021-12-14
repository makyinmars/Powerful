import { useForm, SubmitHandler } from "react-hook-form";
import { useAppSelector } from "../../app/hooks";
import { CreateProgressRequest } from "../../app/services/interfaces/progressInterface";

import { useCreateProgressMutation } from "../../app/services/progressApi";

const ProgressPage = () => {
  // Get user id
  const { user } = useAppSelector((state) => state.auth);

  const userId: string = user?.id as string;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CreateProgressRequest>();

  const [createProgress, { isLoading, isError, error, isSuccess }] =
    useCreateProgressMutation();

  const onProgressSubmit: SubmitHandler<CreateProgressRequest> = async (
    data
  ) => {
    // console.log(URL.createObjectURL(data.image[0]));
    const { description, weight } = data;

    const formData = new FormData();
    formData.append("image", data.image[0], data.image[0].name);

    console.log(formData.getAll("image"));

    const image = formData.getAll("image");

    try {
      const progress = await createProgress({
        image,
        description,
        weight,
        userId,
      }).unwrap();
      console.log(progress);
      console.log(isSuccess, isLoading, isError);
    } catch (error) {
      console.log(error);
    }
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
              name="image"
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
                valueAsNumber: true,
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
