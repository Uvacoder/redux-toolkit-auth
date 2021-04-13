import React, { LegacyRef } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  loginPending,
  loginSuccess,
  loginFail,
} from "../store/auth/loginSlice";
import { loginSchema } from "../utils/validationSchema";

interface LoginForm {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const { register, handleSubmit, errors } = useForm<LoginForm>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <div className="h-screen flex justify-center mt-20">
      <form className="flex flex-col w-96" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="mb-8 text-3xl font-bold">Login to your account </h2>

        <label className="mb-2 font-semibold">Email</label>
        <input
          className="border-2 border-black"
          name="email"
          type="email"
          ref={register}
        />
        <small className="mt-1 mb-6 font-semibold text-red-500">
          {errors.email?.message}
        </small>

        <label className="mb-2 font-semibold">Password</label>
        <input
          className="border-2 border-black"
          type="password"
          name="password"
          ref={register}
        />
        <small className="mt-1 mb-6 font-semibold text-red-500">
          {errors.password?.message}
        </small>

        <button className="bg-blue-600 text-white font-semibold mt-4 h-10">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
