import React, { ChangeEventHandler, FocusEventHandler } from "react";
import styles from "./Select.module.scss";
import { Option } from "./types";
import { customStyles } from "./Select.styles";
import { Select as SelectLib } from '@chakra-ui/react'
import { ActionMeta } from "react-select";


interface Props {
    options: Option[];
    onChange: (value: string | number) => void;
    defaultMenuIsOpen?: boolean;
    placeholder?: string;
    menuPlacement?: "auto" | "bottom" | "top";
    noOptionsMessage?: string;
    onBlur?: React.FocusEventHandler<HTMLSelectElement>;
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
                placeholder={placeholder}
                onChange={(e) => onChange(e.currentTarget.value)}
                onBlur={onBlur}
            >
                {options.map(item => <option value={item.value}>{item.label}</option>)}
            </SelectLib>
        </div>
    );
};
