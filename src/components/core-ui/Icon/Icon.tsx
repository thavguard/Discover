import styles from "./Icon.module.scss";
import { FC } from "react";
import icons from "assets/icons/icons";

interface Props {
  name: keyof typeof icons;
  size?: "default" | "small" | "medium" | "large";
}

export const Icon: FC<Props> = ({ name, size }) => {
  const svg = icons[name];

  return (
    <div
      className={styles.icon}
      data-size={size}
      dangerouslySetInnerHTML={{ __html: svg }}
    ></div>
  );
};
