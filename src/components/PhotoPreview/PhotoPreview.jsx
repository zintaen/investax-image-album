import React from 'react';

import styles from './PhotoPreview.module.css';
import Modal from '../Modal';

export default function ({ photoPreview, onClose }) {
  return (
    <Modal
      open={true}
      title={photoPreview.name}
      subtitle={photoPreview.album}
      onClose={onClose}
    >
      <div className={styles.preview}>
        <div className={`${styles.photo} ${styles[photoPreview.album]}`}>
          <img
            src={photoPreview.raw}
            title={`${photoPreview.album} - ${photoPreview.name}`}
            alt={`${photoPreview.album} - ${photoPreview.name}`}
          />
        </div>
      </div>
    </Modal>
  );
}
