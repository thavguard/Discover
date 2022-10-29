import React from "react";
import styles from "./Error.module.scss";

type Props = {
  children: React.ReactNode;
};

export const Error = ({ children }: Props) => {
  return <div className={styles.error}>{children}</div>;
};
