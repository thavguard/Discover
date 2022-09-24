import { useFormik } from "formik";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { login } from "../../../store/slices/auth.slice";
import { Button } from "../../core-ui/Button/Button";
import { Field } from "../../core-ui/Field/Field";
import { Input } from "../../core-ui/Input/Input";
import { AuthBox } from "../AuthBox/AuthBox";
import styles from "./LoginForm.module.scss";

type Inputs = {
  email: string;
  password: string;
};

export const LoginForm = () => {
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
    <AuthBox>
      <form onSubmit={handleSubmit}>
        <div className={styles.fields}>
          <Field label="email">
            <Input
              name="email"
              id="email"
              onChange={handleChange}
              placeholder={"email"}
            />
          </Field>
          <Field label="password">
            <Input
              name="password"
              id="password"
              onChange={handleChange}
              placeholder={"password"}
            />
          </Field>
          <Button fullwidth>login</Button>
        </div>
      </form>
    </AuthBox>
  );
};
