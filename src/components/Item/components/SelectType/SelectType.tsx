import React from "react";
import { ActionMeta } from "react-select";
import { Select } from "../../../core-ui/Select/Select";
import { Option } from "../../../core-ui/Select/types";
import styles from "./SelectType.module.scss";
import { IItemType } from "../../types";

type Props = {
  options: IItemType[];
  onChange: (option: Option| null, actionMeta: ActionMeta<Option>) => void;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
};

export const SelectType = ({ options, onChange, onBlur }: Props) => {
  const typeToOption = options.map((e) => ({ value: e.id, label: e.name }));

  return (
    <div>
      <Select options={typeToOption} onChange={onChange} onBlur={onBlur}/>
    </div>
  );
};
