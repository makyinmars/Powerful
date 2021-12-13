import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import { User } from "../app/services/interfaces/userInterface";
import ErrorQueryHandling from "./errorQuery";
import Spinner from "./spinner";

interface UserInfoProps {
  data: User;
  isLoading: boolean;
  isError: boolean;
  error: any; // Expected to be a { status: 2xx, message: error message }
}

const UserInfo = ({ data, isLoading, isError, error }: UserInfoProps) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<User>();

  const onUserInfoSubmit: SubmitHandler<User> = async (data) =>
    console.log(data);

  const onUpdateUserSubmit: SubmitHandler<User> = async (data) =>
    console.log(data);

  const onDeleteUserSubmit: SubmitHandler<User> = async (data) =>
    console.log(data);

  return (
    <>
      <h1 className="heading-brand">User Information</h1>

      <div className="container-brand">
        <div className="form-brand-container">
          <form className="form-brand">
            {/* Name */}

            <label htmlFor="name" className="label-brand">
              Name
            </label>
            <input
              id="name"
              type="text"
              {...register("name", { required: "The name is required" })}
              className="input-brand"
              defaultValue={data.name}
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
              defaultValue={data.email}
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
              defaultValue={data.password}
            />

            {errors.password && (
              <span className="error-brand">{errors.password.message}</span>
            )}

            {/* Age */}

            <label htmlFor="age" className="label-brand">
              Age
            </label>
            <input
              type="number"
              {...register("age", {
                min: {
                  value: 5,
                  message: "Age must be greater than 5",
                },
                max: {
                  value: 99,
                  message: "Age must be less than 99",
                },
              })}
              className="input-brand"
              defaultValue={data.age}
            />

            {errors.age && (
              <span className="error-brand">{errors.age.message}</span>
            )}

            {/* Goal */}

            <label htmlFor="goal" className="label-brand">
              Goal
            </label>
            <input
              type="text"
              {...register("goal")}
              className="input-brand"
              defaultValue={data.goal}
            />

            {/* Submit */}
            <button
              type="submit"
              className="button-brand"
              onClick={handleSubmit(onUpdateUserSubmit)}
            >
              Update
            </button>
            <button
              type="submit"
              className="button-brand"
              onClick={handleSubmit(onDeleteUserSubmit)}
            >
              Delete
            </button>

            {/* Status */}
            {isLoading && <Spinner />}
            {isError ? <ErrorQueryHandling error={error} /> : null}
          </form>
        </div>
      </div>
    </>
  );
};

export default UserInfo;
