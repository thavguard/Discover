import { FC, PropsWithChildren } from "react";
import styles from "./Field.module.scss";

interface Props {
    label?: string;
};

export const Field: FC<PropsWithChildren<Props>> = ({ children, label }) => {
    return (
        <div className={styles.field}>
            <div className={styles.label}>{label}</div>
            <div>{children}</div>
        </div>
    );
};
