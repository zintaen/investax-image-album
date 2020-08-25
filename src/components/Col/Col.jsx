import React from 'react'
import styles from './Col.module.css'

export default function ({ children }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.col}>{children}</div>
    </div>
  )
}
