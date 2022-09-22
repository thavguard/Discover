import { useFormik } from "formik";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { login } from "../../../store/slices/auth.slice";
import { Button } from "../../core-ui/Button/Button";
import "./LoginForm.scss";

type Inputs = {
  email: string;
  password: string;
};

export const AuthForm = () => {
  const dispatch = useAppDispatch();

  const { handleSubmit, handleChange, values } = useFormik({
    initialValues: {
      email: "",
      password: "",
    } as Inputs,
    onSubmit: ({ email, password }: Inputs) => {
      console.log(email, password);
      dispatch(login(email, password));
    },
  });

  return (
    <div className="form-container">
      <form className="form" onSubmit={handleSubmit}>
        <div className="form__input">
          <input
            id="email"
            name="email"
            type="text"
            onChange={handleChange}
            value={values.email}
            placeholder="email"
          />
        </div>
        <div className="form__input">
          <input
            id="password"
            name="password"
            type="password"
            onChange={handleChange}
            value={values.password}
            placeholder="password"
          />
        </div>
        <Button fullwidth>Login</Button>
      </form>
    </div>
  );
};
