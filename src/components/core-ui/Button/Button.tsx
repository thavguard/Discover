import React from "react";
import styles from "./Button.module.scss";

type Props = {
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  fullwidth?: boolean;
  children: React.ReactNode;
};

export const Button = ({
  onClick,
  type = "submit",
  fullwidth = false,
  children,
}: Props) => {
  return (
    <button
      className={styles.button}
      onClick={onClick}
      type={type}
      data-fullwidth={fullwidth}
    >
      {children}
    </button>
  );
};
