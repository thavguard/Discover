import { FC } from "react";
import { FormItems } from "../../components/Item/components/FormItems/FormItems";
import styles from "./AddItem.module.scss";


type Props = {};

export const AddItem: FC = ({}: Props) => {
    return (
        <div className={styles.container}>
            <FormItems/>
        </div>
    );
};
