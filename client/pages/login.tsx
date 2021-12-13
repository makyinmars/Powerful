import Link from "next/link";
import { useRouter } from "next/router";
import { useForm, SubmitHandler } from "react-hook-form";
import { setCredentials } from "../app/features/auth/authSlice";
import { useDispatch } from "react-redux";

import { useLoginMutation } from "../app/services/userApi";
import type { LoginRequest } from "../app/services/interfaces/userInterface";
import ErrorHandling from "../components/errorQuery";
import Spinner from "../components/spinner";

const Login = () => {
  const dispatch = useDispatch();

  const router = useRouter();

  const [login, { isLoading, isError, error }] = useLoginMutation();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<LoginRequest>();

  const onLoginSubmit: SubmitHandler<LoginRequest> = async (data) => {
    try {
      const user = await login(data).unwrap();
      dispatch(setCredentials(user));
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1 className="heading-brand">Login to your account</h1>

      <p className="text-center">
        Not a member yet?{" "}
        <Link href="/register">
          <a className="title-brand">Register</a>
        </Link>
      </p>
      <div className="container-brand">
        <div className="form-brand-container">
          <form onSubmit={handleSubmit(onLoginSubmit)} className="form-brand">
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
              id="password"
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
              Login
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

export default Login;
