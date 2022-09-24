import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { LoginForm } from "../../../components/Auth/LoginForm/LoginForm";
import { AppLink } from "../../../components/core-ui/Link/Link";
import styles from "./LoginPage.module.scss";

type Props = {};

export const Login = (props: Props) => {
  // const { token } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  // if (token) {
  //   navigate("/");
  // }

  return (
    <div className={styles.auth_container}>
      <div className={styles.auth__welcome}>
        To use all the features of the service, please log in
      </div>
      <div className={styles.auth__form__container}>
        <div className={styles.auth__form}>
          <LoginForm />
          <div className={styles.createAccount}>
            don't have an accout?&nbsp;
            <AppLink to={"/registration"}> Create an account</AppLink>
          </div>
        </div>
      </div>
    </div>
  );
};
