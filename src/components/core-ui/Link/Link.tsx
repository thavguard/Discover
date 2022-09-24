import React, { ReactNode } from "react";
import styles from "./Link.module.scss";
import { Link } from "react-router-dom";

type Props = {
  to: string;
  children: ReactNode;
};

export const AppLink = ({ to = "/", children }: Props) => {
  return (
    <div className={styles.link}>
      <Link to={to}>{children}</Link>
    </div>
  );
};
