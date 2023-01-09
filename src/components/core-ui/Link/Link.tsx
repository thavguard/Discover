import { FC, PropsWithChildren, } from "react";
import styles from "./Link.module.scss";
import { Link } from "react-router-dom";
import urls from 'settings/urls.json'

interface Props {
    to: string;
};

export const AppLink: FC<PropsWithChildren<Props>> = ({ to = urls.home, children }) => {
    return (
        <div className={styles.link}>
            <Link to={to}>{children}</Link>
        </div>
    );
};
