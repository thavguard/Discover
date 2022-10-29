import { useFormik } from "formik";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../../../hooks/hooks";
import { login } from "../../../../store/slices/auth/auth.slice";
import { Button } from "../../../core-ui/Button/Button";
import { Field } from "../../../core-ui/Field/Field";
import { Input } from "../../../core-ui/Input/Input";
import { AuthBox } from "../../../common/AuthBox/AuthBox";
import styles from "./LoginForm.module.scss";
import * as Yup from "yup";
import { Invalid } from "../../../core-ui/Invalid/Invalid";

type Inputs = {
  email: string;
  password: string;
};

const validateShema = Yup.object().shape({
  email: Yup.string().email("invalid email").required("email is required"),
  password: Yup.string().required("password is required"),
});

export const LoginForm = () => {
  const dispatch = useAppDispatch();

  const {
    handleSubmit,
    handleChange,
    values,
    isValid,
    handleBlur,
    errors,
    touched,
  } = useFormik({
    initialValues: {
      email: "",
      password: "",
    } as Inputs,
    onSubmit: ({ email, password }: Inputs) => {
      console.log(email, password);
      dispatch(login(email, password));
    },
    validationSchema: validateShema,
  });

  console.log(errors);

  return (
    <AuthBox>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.fields}>
          <Field label="email">
            <Input
              value={values.email}
              name="email"
              id="email"
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder={"email"}
            />
            {errors.email && touched.email && <Invalid>{errors.email}</Invalid>}
          </Field>
          <Field label="password">
            <Input
              value={values.password}
              name="password"
              id="password"
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder={"password"}
            />
            {errors.password && touched.password && (
              <Invalid>{errors.password}</Invalid>
            )}
          </Field>
          <Button fullwidth disabled={!isValid}>
            login
          </Button>
        </div>
      </form>
    </AuthBox>
  );
};
