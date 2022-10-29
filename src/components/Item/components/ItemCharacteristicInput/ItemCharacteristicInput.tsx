import React, { HTMLAttributes, ReactEventHandler } from 'react';
import styles from './ItemCharacteristicInput.module.scss'
import { Input } from "../../../core-ui/Input/Input";

interface Props extends HTMLAttributes<HTMLInputElement> {
    id?: string
    name?: string
    placeholder?: string
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const ItemCharacteristicInput = ({ name, placeholder, id, value, onChange, ...props }: Props) => {
    return (
        <div className={styles.container}>
            <label htmlFor={id}>{placeholder}</label>
            <div className={styles.input}>
                <Input value={value} name={name} onChange={onChange} placeholder={placeholder} {...props}/>
            </div>
        </div>
    );
};

export default ItemCharacteristicInput;
