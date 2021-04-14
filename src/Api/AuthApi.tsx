import axios from "axios";
import { LoginForm, Route } from "../types";

export const userLogin = async (loginForm: LoginForm) => {
  try {
    return await axios.post(Route.LOGIN, loginForm);
  } catch (err) {
    return err.response;
  }
};
