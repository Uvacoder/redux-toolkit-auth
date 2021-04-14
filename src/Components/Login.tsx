import React, { LegacyRef } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  loginPending,
  loginSuccess,
  loginFail,
  selectLoginState,
} from "../store/auth/loginSlice";
import { LoginForm } from "../types";
import { userLogin } from "../Api/AuthApi";
import { loginSchema } from "../utils/validationSchema";
import { log } from "util";

const Login: React.FC = () => {
  const { register, handleSubmit, errors } = useForm<LoginForm>({
    resolver: yupResolver(loginSchema),
  });

  const dispatch = useAppDispatch();
  const { isLoading, isAuth, error } = useAppSelector(selectLoginState);

  const onSubmit = async (data: LoginForm) => {
    dispatch(loginPending());

    const loginData = await userLogin(data);

    switch (loginData.status) {
      case 200:
        dispatch(loginSuccess());
        break;
      case 401:
        dispatch(loginFail(loginData.data.message));
        break;
      default:
        console.log(loginData);
    }
  };

  return (
    <div className="h-screen flex justify-center pt-14">
      <form
        className="flex flex-col w-80 md:w-96"
        onSubmit={handleSubmit(onSubmit)}
      >
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
        <small className="mt-1  font-semibold text-red-500">
          {errors.password?.message}
        </small>

        <small className="mb-7 font-semibold text-red-500 h-5">{error}</small>

        {isLoading ? (
          <button className="bg-blue-600 text-white font-semibold  h-10">
            Loading...
          </button>
        ) : (
          <button className="bg-blue-600 text-white font-semibold  h-10">
            Login
          </button>
        )}
      </form>
    </div>
  );
};

export default Login;
