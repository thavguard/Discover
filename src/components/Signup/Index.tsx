import React from "react";
import { SignupForm } from "./components/SignupForm/SignupForm";
import { AppLink } from "../core-ui/Link/Link";
import styles from "./Index.module.scss";

type Props = {};

export const Signup = (props: Props) => {
    return (
        <div className={styles.signupPage}>
            <div className={styles.container}>
                <SignupForm/>
                <div className={styles.login}>
                    already have an account?&nbsp; <AppLink to="/login"> login</AppLink>
                </div>
            </div>
        </div>
    );
};
