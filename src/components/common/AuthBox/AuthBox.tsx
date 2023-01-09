import { FC, PropsWithChildren } from 'react'
import styles from './AuthBox.module.scss'

interface Props {

}

export const AuthBox: FC<PropsWithChildren<Props>> = ({ children }) => {
    return (
        <div className={styles.box}>
            {children}
        </div>
    )
}
