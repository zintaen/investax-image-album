import React from 'react';
import { BsCheckBox, BsEye, BsTrash } from 'react-icons/bs';
import { AiOutlineCheck } from 'react-icons/ai';
import styles from './PhotoItem.module.css';

export default React.memo(
  function ({ photo, selected, actions, ...props }) {
    return (
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div
            className={`${styles.photo} ${styles[photo.album]} ${
              props.isBlur ? styles.blur : ''
            }`}
          >
            <img
              src={photo.raw}
              title={photo.name}
              alt={`${photo.album} - ${photo.name}`}
            />
          </div>
          <div className={styles.backdrop}>
            {!selected && <BsCheckBox onClick={actions.onSelect} color="fff" size={30} />}
            <BsEye onClick={actions.onPreview} color="fff" size={30} />
            <BsTrash onClick={actions.onDelete} color="fff" size={30} />
          </div>
          {selected && (
            <div className={styles.selected}>
              <AiOutlineCheck onClick={actions.onUnSelect} color="000" size={30} />
            </div>
          )}
        </div>
        <div className={styles.info}>
          <h4>{photo.name}</h4>
          <p>{photo.album}</p>
        </div>
      </div>
    );
  }
);
