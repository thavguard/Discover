import { FC, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { LoginForm } from "../../components/Login/components/LoginForm/LoginForm";
import { Error } from "../../components/core-ui/Error/Error";
import { Invalid } from "../../components/core-ui/Invalid/Invalid";
import { AppLink } from "../../components/core-ui/Link/Link";
import { useAppSelector } from "../../hooks/hooks";
import styles from "./Login.module.scss";
import urls from 'settings/urls.json'

type Props = {};

export const Login: FC = (props: Props) => {
    const { error } = useAppSelector((state) => state.auth);
    const navigate = useNavigate();


    return (
        <div className={styles.auth_container}>
            <div className={styles.auth__welcome}>
                To use all the features of the service, please log in
            </div>
            <div className={styles.auth__form__container}>
                <div className={styles.auth__form}>
                    <LoginForm/>
                    <div className={styles.createAccount}>
                        don't have an accout?&nbsp;
                        <AppLink to={urls.signup}> Create an account</AppLink>
                    </div>
                    <div className={styles.error}>
                        <Error>{error}</Error>
                    </div>
                </div>
            </div>
        </div>
    );
};
