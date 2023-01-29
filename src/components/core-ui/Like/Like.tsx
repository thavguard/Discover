import { FC } from 'react';
import { IconSizes } from "../Icon/types";
import styles from './Like.module.scss'
import { Icon } from "../Icon/Icon";

interface Props {
    isActive: boolean
    size?: IconSizes
}

const Like: FC<Props> = ({ isActive, size = 'small' }) => {
    return (
        <div className={styles.like} data-isActive={isActive}>
            <Icon name={'heartSVG'} size={size}/>
        </div>
    );
};

export default Like;
