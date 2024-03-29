import { FC, ChangeEvent, HTMLAttributes, FocusEvent, ReactNode } from "react";
import styles from "./Input.module.scss";

interface Props extends HTMLAttributes<HTMLInputElement> {
    value: string;
    name?: string;
    id?: string;
    type?: string;
    placeholder?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
}

export const Input: FC<Props> = ({
                                     type = "text",
                                     onChange,
                                     onBlur,
                                     name,
                                     placeholder,
                                     id,
                                     value,
                                     ...props
                                 }) => {
    return (
        <div className={styles.inputContainer}>
            <input
                type="text"
                onChange={onChange}
                onBlur={onBlur}
                name={name}
                placeholder={placeholder}
                id={id}
                value={value}
                {...props}
            />
        </div>
    );
};
