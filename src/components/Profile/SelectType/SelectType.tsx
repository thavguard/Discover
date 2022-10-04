import React from "react";
import { IItemType } from "../../../types/types";
import { Select } from "../../core-ui/Select/Select";
import styles from "./SelectType.module.scss";

type Props = {
  options: IItemType[];
};

export const SelectType = ({ options }: Props) => {
  const typeToOption = options.map((e) => ({ value: e.id, label: e.name }));

  return (
    <div>
      <Select options={typeToOption} />
    </div>
  );
};
