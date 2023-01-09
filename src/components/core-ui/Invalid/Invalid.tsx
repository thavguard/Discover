import { FC, PropsWithChildren } from "react";
import styles from "./Invalid.module.scss";

interface Props {
}

export const Invalid: FC<PropsWithChildren<Props>> = ({ children }) => {
    return <div className={styles.invalid}>{children}</div>;
};
