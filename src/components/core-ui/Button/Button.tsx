import classNames from "classnames";
import React, { useEffect, useRef, useState } from "react";
import styles from "./Button.module.scss";

type Props = {
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
    fullwidth?: boolean;
    br?: "br-0" | "br-1";
    size?: "big";
    disabled?: boolean;
    children: React.ReactNode;
};

export const Button = (
    {
        onClick = () => null,
        type = "submit",
        fullwidth = false,
        br,
        disabled,
        children,
        size,
    }: Props) => {
    return (
        <button
            className={classNames([styles.button])}
            onClick={onClick}
            type={type}
            data-fullwidth={fullwidth}
            data-br={br}
            data-size={size}
            data-disabled={disabled}
            disabled={disabled}
        >
            <div className={styles.children}>{children}</div>
        </button>
    );
};
