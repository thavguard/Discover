import { FC, PropsWithChildren } from "react";
import styles from "./Grid.module.scss";

interface Props {
};

export const GridItems: FC<PropsWithChildren<Props>> = (
    {
        children,
    }) => {
    return (
        <div className={styles["items"]}>
            {children}
        </div>
    );
};
