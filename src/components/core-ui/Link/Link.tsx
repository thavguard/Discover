import React, { ReactNode } from "react";
import styles from "./Link.module.scss";
import { Link } from "react-router-dom";
import urls from 'settings/urls.json'

type Props = {
    to: string;
    children: ReactNode;
};

export const AppLink = ({ to = urls.home, children }: Props) => {
    return (
        <div className={styles.link}>
            <Link to={to}>{children}</Link>
        </div>
    );
};
