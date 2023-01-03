import { FC } from "react";
import { SignupForm } from "../../components/Signup/components/SignupForm/SignupForm";
import { AppLink } from "../../components/core-ui/Link/Link";
import styles from "./Signup.module.scss";

type Props = {};

export const Signup: FC = (props: Props) => {
  return (
    <div className={styles.signupPage}>
      <div className={styles.container}>
        <SignupForm />
        <div className={styles.login}>
          already have an account?&nbsp; <AppLink to="/login"> login</AppLink>
        </div>
      </div>
    </div>
  );
};
