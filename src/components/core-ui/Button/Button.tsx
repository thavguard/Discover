import React from "react";
import styles from "./Button.module.scss";

type Props = {
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  fullwidth?: boolean;
  variant?: "withoutBorderRadius";
  children: React.ReactNode;
};

export const Button = ({
  onClick,
  type = "submit",
  fullwidth = false,
  variant,
  children,
}: Props) => {
  return (
    <button
      className={styles.button}
      onClick={onClick}
      type={type}
      data-fullwidth={fullwidth}
      data-variant={variant}
    >
      {children}
    </button>
  );
};
