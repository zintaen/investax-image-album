import React from 'react'
import styles from './Row.module.css'

export default function ({ children, ...props }) {
  return (
    <div {...props} className={styles.row}>
      {children}
    </div>
  )
}
