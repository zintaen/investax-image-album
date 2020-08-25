import React, { useState, useRef } from 'react';
import { BsCloudUpload, BsTrash } from 'react-icons/bs';
import { useForm } from 'react-hook-form';

import Modal from '../Modal';
import Row from '../Row';
import Col from '../Col';
import albums from './albums';
import styles from './Upload.module.css';

const Upload = (props) => {
  const [fileList, setFileList] = useState([]);
  const { register, handleSubmit, errors } = useForm();
  let fileRef = useRef();
  let albumRef = useRef();

  function _handleChange(event) {
    event.persist();
    const { files } = event.target;
    const newFileList = [...fileList];
    newFileList.push(...files);
    setFileList(newFileList);
  }

  function _handleRemove(index) {
    const newFileList = [...fileList];
    newFileList.splice(index, 1);
    if (!newFileList.length) {
      fileRef.current.value = null;
    }
    setFileList(newFileList);
  }

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append('album', data.album);
    fileList.forEach((file) => formData.append('documents', file));
    props.onSubmit(formData, () => {
      setFileList([]);
      fileRef.current.value = null;
      albumRef.current.value = '';
    });
  };

  return (
    <Modal
      open={true}
      title="Upload photos"
      onClose={props.onClose}
      footer={
        <div className={styles.footer}>
          <div className={styles.select}>
            <select
              name="album"
              ref={(e) => {
                albumRef.current = e;
                register(e, { required: 'Album is required' });
              }}
              className={styles.select}
            >
              <option value="">Select album</option>
              {albums.map((album, index) => (
                <option key={index.toString()} value={album.value}>
                  {album.label}
                </option>
              ))}
            </select>
            <p className={styles.error}>{errors?.album?.message}</p>
          </div>
          <button onClick={handleSubmit(onSubmit)} className={styles.button}>
            <BsCloudUpload />
            Upload
          </button>
        </div>
      }
    >
      <div>
        <div className={styles.wrapper}>
          <input
            type="file"
            multiple
            name="documents"
            ref={(e) => {
              fileRef.current = e;
              register(e, { required: 'Photos are required' });
            }}
            className={styles.input}
            onChange={_handleChange}
          />
          <p className={styles.text}>
            Drag 'n' drop some files here, or click to select files
          </p>
        </div>
        <div className={styles.files}>
          {!fileList.length ? (
            <p>No files selected...</p>
          ) : (
            <Row>
              {fileList.map((file, index) => {
                const src = URL.createObjectURL(file);
                return (
                  <Col key={index.toString()}>
                    <div className={styles.file}>
                      <div className={styles.photo}>
                        <img src={src} alt={file.name} />
                        <div className={styles.blur}>
                          <BsTrash
                            onClick={() => _handleRemove(index)}
                            color="fff"
                            size={24}
                          />
                        </div>
                      </div>
                    </div>
                  </Col>
                );
              })}
            </Row>
          )}
        </div>
        <p className={styles.error}>{errors?.documents?.message}</p>
      </div>
    </Modal>
  );
};

export default Upload;
