import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/router";

import { setCredentials } from "../app/features/auth/authSlice";
import { useAppDispatch } from "../app/hooks";
import { useRegisterUserMutation } from "../app/services/userApi";
import type { RegisterRequest } from "../app/services/interfaces/userInterface";
import ErrorHandling from "../components/errorQuery";
import Spinner from "../components/spinner";
import HeadPage from "../components/headPage";

const RegisterPage = () => {
  const dispatch = useAppDispatch();

  const router = useRouter();

  const [registerUser, { isLoading, isError, error }] =
    useRegisterUserMutation();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterRequest>();

  const onRegisterSubmit: SubmitHandler<RegisterRequest> = async (data) => {
    try {
      const user = await registerUser(data).unwrap();
      dispatch(setCredentials(user));
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <HeadPage title="Register" />

      <h1 className="heading-brand">Create your account</h1>
      <p className="text-center">
        Already registered?{" "}
        <Link href="/login">
          <a className="title-brand">Login</a>
        </Link>
      </p>
      <div className="container-brand">
        <div className="form-brand-container">
          <form
            onSubmit={handleSubmit(onRegisterSubmit)}
            className="form-brand"
          >
            {/* Name */}

            <label htmlFor="name" className="label-brand">
              Name
            </label>
            <input
              id="name"
              type="text"
              {...register("name", { required: "The name is required" })}
              className="input-brand"
            />
            {errors.name && (
              <span className="error-brand">{errors.name.message}</span>
            )}

            {/* Email */}

            <label htmlFor="email" className="label-brand">
              Email
            </label>

            <input
              id="email"
              type="email"
              {...register("email", { required: "The email is required" })}
              className="input-brand"
            />
            {errors.email && (
              <span className="error-brand">{errors.email.message}</span>
            )}

            {/* Password */}

            <label htmlFor="password" className="label-brand">
              Password
            </label>
            <input
              type="password"
              {...register("password", {
                required: "The password is required",
                minLength: {
                  value: 6,
                  message: "Minimum length must be at least 6 characters",
                },
              })}
              className="input-brand"
            />

            {errors.password && (
              <span className="error-brand">{errors.password.message}</span>
            )}

            {/* Submit */}
            <button type="submit" className="button-brand">
              Register
            </button>

            {/* Status */}
            {isLoading && <Spinner />}
            {isError ? <ErrorHandling error={error} /> : null}
          </form>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
