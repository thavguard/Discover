import { FC, PropsWithChildren } from "react";
import styles from "./Error.module.scss";

interface Props {
}

export const Error: FC<PropsWithChildren<Props>> = ({ children }) => {
    return <div className={styles.error}>{children}</div>;
};
