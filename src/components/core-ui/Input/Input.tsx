import React, { ChangeEvent } from "react";
import styles from "./Input.module.scss";

type Props = {
  type?: string;
  name: string;
  id?: string;
  placeholder?: string;
  onChange: (e: React.FormEvent<HTMLInputElement>) => void;
  onBlur?: () => void;
};

export const Input = ({
  type = "text",
  onChange,
  onBlur,
  name,
  placeholder,
  id,
}: Props) => {
  return (
    <div className={styles.inputContainer}>
      <input
        type="text"
        onChange={onChange}
        onBlur={onBlur}
        name={name}
        placeholder={placeholder}
        id={id}
      />
    </div>
  );
};
