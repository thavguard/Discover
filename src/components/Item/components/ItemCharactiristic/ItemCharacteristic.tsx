import React from "react";
import styles from "./ItemCharactiristic.module.scss";

type Props = {
    title: string;
    desc: string;
};

export const ItemCharacteristic = ({ title, desc }: Props) => {
    return (
        <div className={styles.container}>
            <span className={styles.title}>{title}:</span>
            <span className={styles.desc}>{desc}</span>
        </div>
    );
};
