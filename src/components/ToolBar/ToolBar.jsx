import React from 'react';
import { BsCloudUpload, BsFillTrashFill } from 'react-icons/bs';

import limits from './limits';
import styles from './ToolBar.module.css';

export default function ({ photoCount, limit, onChange, ...props }) {
  return (
    <div className={styles.container}>
      <h1>Photos</h1>
      <div className={styles.actions}>
        {!!photoCount && (
          <button
            onClick={props.onDeletePhotos}
            className={`${styles.field} ${styles.button} ${styles.delete}`}
          >
            <BsFillTrashFill />
            {`Delete ${photoCount} photos`}
          </button>
        )}
        <button className={`${styles.field} ${styles.button}`} onClick={props.onUploads}>
          <BsCloudUpload />
          Up load
        </button>
        <select value={limit} onChange={onChange} className={styles.field}>
          {limits.map((limit) => (
            <option value={limit} key={limit}>
              {limit}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
