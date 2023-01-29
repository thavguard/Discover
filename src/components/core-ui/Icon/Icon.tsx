import styles from "./Icon.module.scss";
import { FC } from "react";
import icons from "assets/icons/icons";
import { IconSizes } from "./types";

interface Props {
    name: keyof typeof icons;
    size?: IconSizes
}

export const Icon: FC<Props> = ({ name, size = 'default' }) => {
    const svg = icons[name];

    return (
        <div
            className={styles.icon}
            data-size={size}
            dangerouslySetInnerHTML={{ __html: svg }}
        ></div>
    );
};
