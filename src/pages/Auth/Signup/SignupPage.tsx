import React from "react";
import { SignupForm } from "../../../components/Auth/SignupForm/SignupForm";
import styles from "./SignupPage.module.scss";

type Props = {};

export const Signup = (props: Props) => {
  return (
    <div className={styles.signupPage}>
      <SignupForm />
    </div>
  );
};
