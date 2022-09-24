import { useFormik } from "formik";
import React from "react";
import { Button } from "../../core-ui/Button/Button";
import { Field } from "../../core-ui/Field/Field";
import { AvatarPicker } from "../../core-ui/AvatarPicker/AvatarPicker";
import { Input } from "../../core-ui/Input/Input";
import { ISignupForm } from "../types";
import styles from "./SignupForm.module.scss";
import { useAppDispatch } from "../../../hooks/hooks";
import { registration } from "../../../store/slices/auth.slice";
import { AuthBox } from "../AuthBox/AuthBox";

type Props = {};

export const SignupForm = (props: Props) => {
  const dispatch = useAppDispatch();

  const { handleChange, values, handleSubmit, setFieldValue } = useFormik({
    initialValues: {
      email: "",
      username: "",
      password: "",
      avatar: "",
    } as ISignupForm,
    onSubmit: ({ email, password, username, avatar }) => {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);
      formData.append("username", username);
      formData.append("avatar", avatar);

      dispatch(registration(formData));
    },
  });

  return (
    <AuthBox>
      <form onSubmit={handleSubmit}>
        <div className={styles.imagePicker}>
          <Field label="avatar">
            <AvatarPicker
              onChange={(img) => {
                setFieldValue("avatar", img);
                console.log(img);
              }}
            />
          </Field>
        </div>
        <div className={styles.fields}>
          <Field label="username">
            <Input
              name="username"
              id="username"
              onChange={handleChange}
              placeholder={"username"}
            />
          </Field>
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

          <Button fullwidth>Signup</Button>
        </div>
      </form>
    </AuthBox>
  );
};
