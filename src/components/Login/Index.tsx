import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { LoginForm } from "./components/LoginForm/LoginForm";
import { Error } from "../core-ui/Error/Error";
import { Invalid } from "../core-ui/Invalid/Invalid";
import { AppLink } from "../core-ui/Link/Link";
import { useAppSelector } from "../../hooks/hooks";
import styles from "./Index.module.scss";

type Props = {};

export const Login = (props: Props) => {
  const { error } = useAppSelector((state) => state.auth);
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
          <div className={styles.error}>
            <Error>{error}</Error>
          </div>
        </div>
      </div>
    </div>
  );
};
