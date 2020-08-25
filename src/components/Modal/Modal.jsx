import React, { useEffect, useRef } from 'react'
import styles from './Modal.module.css'

const Modal = ({ onClose, title, subtitle, footer, ...props }) => {
  const modalRef = useRef()

  useEffect(() => {
    document.addEventListener('mousedown', _handleClickOutside)
    return () => document.removeEventListener('mousedown', _handleClickOutside)
  }, [])

  function _handleClickOutside(event) {
    if (!modalRef.current.contains(event.target)) {
      return onClose ? onClose() : false
    }
  }

  return (
    <div
      id="myModal"
      className={`${styles.modal} ${props.open ? styles.open : ''}`}
    >
      <div className={styles.content} ref={modalRef}>
        <div className={styles.header}>
          <span onClick={onClose} className={styles.close}>
            &times;
          </span>
          <div>
            {title && <h3>{title}</h3>}
            {subtitle && <h5>{subtitle}</h5>}
          </div>
        </div>
        <div className={styles.body}>{props.children}</div>
        {footer && <div className={styles.footer}>{footer}</div>}
      </div>
    </div>
  )
}

export default Modal
