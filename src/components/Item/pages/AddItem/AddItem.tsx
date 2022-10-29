import React from "react";
import { FormItems } from "../../components/FormItems/FormItems";
import styles from "./AddItem.module.scss";

type Props = {};

export const AdddItem = ({}: Props) => {
  return (
    <div className={styles.container}>
      <FormItems />
    </div>
  );
};
