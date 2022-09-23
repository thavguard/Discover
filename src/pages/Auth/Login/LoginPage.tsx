import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AuthForm } from "../../../components/Auth/LoginForm/LoginForm";
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
          <AuthForm />
          <div>
            don't have an accout?{" "}
            <Link to={"/registration"}>Create account</Link>
          </div>
        </div>
      </div>
    </div>
  );
};
