import React from "react";
import { Option } from "./types";
import { Select as SelectLib } from '@chakra-ui/react'


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
                borderColor={'inputBorder.100'}
                borderWidth={'2px'}
                height={'44px'}
                _hover={{ borderColor: 'inputBorder.200' }}
            >
                {options.map(item => <option value={item.value}>{item.label}</option>)}
            </SelectLib>
        </div>
    );
};
