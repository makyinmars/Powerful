import Link from "next/link";
import React, { ChangeEvent, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

interface Inputs {
  name: string;
  email: string;
  password: string;
}

const Register = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <>
      <h1 className="heading-brand">Create your account</h1>
      <p className="text-center">
        Already registered?{" "}
        <Link href="/login">
          <a className="title-brand hover:courser-pointer">Sign in</a>
        </Link>
      </p>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="form-brand-container">
          <form onSubmit={handleSubmit(onSubmit)} className="form-brand">
            {/* Name */}

            <label htmlFor="name" className="label-brand">
              Name
            </label>
            <div className="mt-1">
              <input
                id="name"
                type="text"
                value={name}
                {...register("name", { required: true })}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setName(e.target.value)
                }
                className="input-brand"
              />
            </div>
            <div className="mt-1">
              {errors.name && (
                <span className="error-brand">This field is required</span>
              )}
            </div>

            {/* Email */}

            <label htmlFor="email" className="label-brand">
              Email
            </label>

            <div className="mt-1">
              <input
                id="email"
                type="email"
                value={email}
                {...register("email", { required: true })}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setEmail(e.target.value)
                }
                className="input-brand"
              />
            </div>
            <div className="mt-1">
              {errors.email && (
                <span className="error-brand">This field is required</span>
              )}
            </div>

            {/* Password */}

            <label htmlFor="password" className="label-brand">
              Password
            </label>
            <div className="mt-1">
              <input
                type="password"
                value={password}
                {...register("password", { required: true })}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setPassword(e.target.value)
                }
                className="input-brand"
              />
            </div>

            <div className="mt-1">
              {errors.password && (
                <span className="error-brand">This field is required</span>
              )}
            </div>
            <button type="submit" className="button-brand">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
