import classNames from "classnames";
import React, { useEffect, useRef, useState } from "react";
import styles from "./Button.module.scss";

type Props = {
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  fullwidth?: boolean;
  variant?: "withoutBorderRadius";
  disabled?: boolean;
  children: React.ReactNode;
};

export const Button = ({
  onClick = () => null,
  type = "submit",
  fullwidth = false,
  variant,
  disabled,
  children,
}: Props) => {
  return (
    <button
      className={classNames([styles.button])}
      onClick={onClick}
      type={type}
      data-fullwidth={fullwidth}
      data-variant={variant}
      data-disabled={disabled}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
