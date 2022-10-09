import React, { FocusEventHandler } from "react";
import styles from "./Select.module.scss";
import SelectLib, { ActionMeta } from "react-select";
import { Option } from "./types";
import { customStyles } from "./Select.styles";

interface Props {
  options: Option[];
  onChange: (option: Option | null, actionMeta: ActionMeta<Option>) => void;
  defaultMenuIsOpen?: boolean;
  placeholder?: string;
  menuPlacement?: "auto" | "bottom" | "top";
  noOptionsMessage?: string;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
}

export const Select = ({
  options,
  defaultMenuIsOpen,
  placeholder = "select",
  menuPlacement = "auto",
  noOptionsMessage = "nothing found",
  onChange,
  onBlur,
}: Props) => {
  return (
    <div>
      <SelectLib
        onChange={onChange}
        onBlur={onBlur}
        options={options}
        styles={customStyles}
        defaultMenuIsOpen={defaultMenuIsOpen}
        placeholder={placeholder}
        menuPlacement={menuPlacement}
        noOptionsMessage={() => noOptionsMessage}
      />
    </div>
  );
};
