import { useRouter } from "next/router";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import { User } from "../app/services/interfaces/userInterface";
import {
  useUpdateUserMutation,
  useDeleteUserMutation,
} from "../app/services/userApi";
import { removeCredentials } from "../app/features/auth/authSlice";
import { useAppDispatch } from "../app/hooks";
import ErrorQueryHandling from "./errorQuery";
import Spinner from "./spinner";
import SuccessQueryHandling from "./successQuery";
import HeadPage from "./headPage";

interface UserInfoProps {
  data: User;
  isLoading: boolean;
  isError: boolean;
  error: any; // Expected to be a { status: 2xx, message: error message }
}

const UserInfo = ({ data, isLoading, isError, error }: UserInfoProps) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<User>();

  const id = data.id;

  // Update User Query
  const [updateUser, { isSuccess: isSuccessUpdate }] = useUpdateUserMutation();

  // Delete User Query
  const [deleteUser] = useDeleteUserMutation();

  const onUpdateUserSubmit: SubmitHandler<User> = async (data) => {
    try {
      const { name, email, password, goal, age } = data;
      await updateUser({
        id,
        name,
        email,
        password,
        goal,
        age,
      }).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  const onDeleteUserSubmit: SubmitHandler<User> = async () => {
    try {
      await deleteUser(id);
      dispatch(removeCredentials());
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <HeadPage title={data.name} />
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
                minLength: {
                  value: 6,
                  message: "Minimum length must be at least 6 characters",
                },
              })}
              className="input-brand"
              placeholder="*******"
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
                valueAsNumber: true,
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
            {isSuccessUpdate && (
              <SuccessQueryHandling text="User information updated" />
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default UserInfo;
