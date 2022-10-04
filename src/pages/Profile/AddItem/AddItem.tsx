import React from "react";
import { FormItems } from "../../../components/Profile/FormItems/FormItems";
import styles from "./AddItem.module.scss";

type Props = {};

export const AdddItem = ({}: Props) => {
  return (
    <div className={styles.container}>
      <FormItems />
    </div>
  );
};
