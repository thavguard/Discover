import React from "react";
import styles from "./Select.module.scss";
import SelectLib from "react-select";
import { Option } from "./types";
import { customStyles } from "./Select.styles";

interface Props {
  options: Option[];
  defaultMenuIsOpen?: boolean;
  placeholder?: string;
  menuPlacement?: "auto" | "bottom" | "top";
  noOptionsMessage?: string;
}

export const Select = ({
  options,
  defaultMenuIsOpen,
  placeholder = "select",
  menuPlacement = "auto",
  noOptionsMessage = "nothing found",
}: Props) => {
  return (
    <div>
      <SelectLib
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
