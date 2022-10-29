import React from "react";
import styles from "./ItemCharactiristic.module.scss";

type Props = {
  title: string;
  desc: string;
};

export const ItemCharacteristic = ({ title, desc }: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>{title}</div>
      <div className={styles.desc}>{desc}</div>
    </div>
  );
};
