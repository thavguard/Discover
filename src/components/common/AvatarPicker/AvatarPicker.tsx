import React, {useRef, useState} from "react";
import styles from "./AvatarPicker.module.scss";

type Props = {
    onChange: (e: any) => void;
};

export const AvatarPicker = ({onChange}: Props) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [file, setFile] = useState<any>();
    const [imgPreviewUrl, setImgPreviewUrl] = useState<any>("");

    const onChangeImg = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();

        const reader = new FileReader();
        const file = e.currentTarget.files![0];

        reader.onloadend = () => {
            setFile(file);
            setImgPreviewUrl(reader.result);
            onChange(file);
        };

        reader.readAsDataURL(file);
    };

    const onRemoveImg = () => {
        setFile("");
        setImgPreviewUrl("");
        inputRef.current!.value = "";
    };

    return (
        <div className={styles.AvatarPicker}>
            <input
                type="file"
                id="file"
                name="file"
                ref={inputRef}
                onChange={(e) => {
                    onChangeImg(e);
                }}
            />
            <div className={styles.picker} onClick={() => inputRef.current?.click()}>
                <img src={imgPreviewUrl} alt=""/>
            </div>
            {file ? (
                <div className={styles.remove} onClick={onRemoveImg}>
                    remove
                </div>
            ) : (
                <div className={styles.desc}>you can upload a photo</div>
            )}
        </div>
    );
};
