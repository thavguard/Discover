import React, { useEffect, useRef, useState } from "react";
import styles from "./AvatarPicker.module.scss";

type Props = {
  onChange: (e: any) => void;
};

export const AvatarPicker = ({ onChange }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [srcImg, setSrcImg] = useState<string>("");
  const [file, setFile] = useState<any>(null);

  const onSelectFile = () => {
    inputRef.current?.click();
  };

  useEffect(() => {
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setSrcImg(objectUrl);
      onChange(file);
    }
  }, [file]);

  return (
    <div className={styles.AvatarPicker}>
      <input
        type="file"
        id="file"
        name="file"
        ref={inputRef}
        onChange={(e) => {
          setFile(e.currentTarget?.files![0]);
        }}
      />
      <div className={styles.picker} onClick={onSelectFile}>
        <img src={srcImg} alt="" />
      </div>
      {/* {file ? (
        <div
          className={styles.remove}
          onClick={() => {
            setFile(null);
            setSrcImg("");
          }}
        >
          remove
        </div>
      ) : (
        <div className={styles.desc}>you can upload a photo</div>
      )} */}
      <div className={styles.desc}>you can upload a photo</div>
    </div>
  );
};
