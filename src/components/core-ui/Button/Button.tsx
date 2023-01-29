import classNames from "classnames";
import { FC, PropsWithChildren, } from "react";
import styles from "./Button.module.scss";

type Props = {
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
    fullwidth?: boolean;
    br?: "br-0" | "br-1";
    size?: "big";
    disabled?: boolean;
    weight?: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
    variant?: 'primary' | 'secondary' | 'outlined' | 'black'
};

export const Button: FC<PropsWithChildren<Props>> = ({
                                                         onClick = () => null,
                                                         type = "submit",
                                                         fullwidth = false,
                                                         br,
                                                         disabled,
                                                         children,
                                                         size,
                                                         weight = 400,
                                                         variant = 'primary',
                                                     }) => {
    return (
        <button
            className={classNames([styles.button])}
            onClick={onClick}
            type={type}
            data-fullwidth={fullwidth}
            data-br={br}
            data-size={size}
            data-disabled={disabled}
            data-variant={variant}
            disabled={disabled}
            style={{ fontWeight: weight }}
        >
            <div className={styles.children}>{children}</div>
        </button>
    );
};
