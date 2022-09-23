import React from "react";
import styles from "./Field.module.scss";

type Props = {
  label?: string;
  children: React.ReactNode;
};

export const Field = ({ children, label }: Props) => {
  return (
    <div className={styles.field}>
      <div className={styles.label}>{label}</div>
      <div>{children}</div>
    </div>
  );
};
