import React, { ReactNode, useEffect, useState } from "react";
import styles from "./UploadItemPhoto.module.scss";
import FileInput from "../../core-ui/FileInput/FileInput";
import { Swiper, SwiperSlide } from "swiper/react";
import { ItemPhoto } from "./types";
import { IFileInputChange } from "../../core-ui/FileInput/types";
import plus from "../../../assets/icons/plus.svg";

interface Props {
  onChange: (e: IFileInputChange) => void;
}

const UploadItemPhoto = ({ onChange }: Props) => {
  const [file, setFile] = useState<File>({} as File);
  const [previewUrl, setPreviewUrl] = useState<string>("");

  useEffect(() => {
    onChange({ file, previewUrl });
  }, [previewUrl, file]);

  return (
    <div className={styles.uploader}>
      <FileInput
        onChange={({ file, previewUrl }) => {
          setPreviewUrl(previewUrl);
          setFile(file);
        }}
      >
        {previewUrl ? (
          <div className={styles.previewImg}>
            <img src={previewUrl} alt={file.name} />
          </div>
        ) : (
          <div className={styles.plus}>
            <img src={plus} alt="add photo" />
          </div>
        )}
      </FileInput>
    </div>
  );
};

export default UploadItemPhoto;
