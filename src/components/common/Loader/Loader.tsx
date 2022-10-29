import React from "react";
import styles from './Loader.module.scss'
import loaderSVG from '../../../assets/icons/loader.svg'

type Props = {};

export const Loader = ({}: Props) => {

    return <div className={styles.container}>
        <div className={styles.loader}>
            <img src={loaderSVG} alt=""/>
        </div>
    </div>;
}

