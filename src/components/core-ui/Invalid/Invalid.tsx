import React, { FC } from "react";
import styles from "./Invalid.module.scss";

interface Props {
  children: React.ReactNode;
}

export const Invalid = ({ children }: Props) => {
  return <div className={styles.invalid}>{children}</div>;
};
