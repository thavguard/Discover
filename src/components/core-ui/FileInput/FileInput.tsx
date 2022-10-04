import React, { ChangeEvent, ReactNode, useRef, useState } from "react";
import styles from "./FileInput.module.scss";
import { IFileInputChange } from "./types";

interface Props {
  onChange: (e: IFileInputChange) => void;
  children: ReactNode;
}

const FileInput = ({ children, onChange }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const onchangeImg = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const file = e.currentTarget.files![0];

    if (file.size > 1.5e7) {
      console.log("Размер файла не может превышать 15 мб");
      return;
    }

    const previewUrl = URL.createObjectURL(file);
    onChange({ file, previewUrl });
  };

  const handleClick = () => inputRef.current?.click();

  return (
    <>
      <input
        type="file"
        style={{ display: "none" }}
        ref={inputRef}
        onChange={onchangeImg}
      />
      <div>
        <div className="" onClick={handleClick}>
          {children}
        </div>
      </div>
    </>
  );
};

export default FileInput;
