import React from 'react'
import styles from './AuthBox.module.scss'

type Props = {
    children: React.ReactNode
}

export const AuthBox = ({children}: Props) => {
  return (
    <div className={styles.box}>
        {children}
    </div>
  )
}