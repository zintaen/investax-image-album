import React from 'react'
import styles from './Spinner.module.css'

export default function () {
  return (
    <div className={styles.fixed}>
      <div className={styles.container}>
        <svg viewBox="0 0 100 100">
          <defs>
            <filter id="shadow">
              <feDropShadow dx="0" dy="0" stdDeviation="1.5" floodColor="#fc6767" />
            </filter>
          </defs>
          <circle
            className={styles.spinner}
            style={{
              fill: 'transparent',
              stroke: '#fc6767',
              strokeWidth: 7,
              strokeLinecap: 'round',
              filter: `url(#shadow)`,
            }}
            cx="50"
            cy="50"
            r="45"
          />
        </svg>
      </div>
    </div>
  )
}
