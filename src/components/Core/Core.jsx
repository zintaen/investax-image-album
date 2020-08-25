import React, { useState, useEffect, useCallback } from 'react';

import Row from '../Row';
import Col from '../Col';
import PhotoItem from '../PhotoItem';
import Upload from '../Upload';
import Spinner from '../Spinner';
import ToolBar from '../ToolBar';
import PhotoPreview from '../PhotoPreview';
import { toast } from '../toast';
import { transformPhotos } from '../../utils';
import { fetchPhotos, uploadPhotos, deletePhotos, deletePhoto } from '../../apis';
import styles from './Core.module.css';

function Core() {
  const [pagination, setPagination] = useState({ skip: 0, limit: 25 });
  const [photoPreview, setPhotoPreview] = useState(null);
  const [isUpload, setIsUpload] = useState(false);
  const [photoSelecteds, setPhotoSelecteds] = useState([]);
  const [photos, setPhotos] = useState({
    loading: true,
    error: false,
    data: null,
  });

  useEffect(() => {
    (async function () {
      try {
        const { data: photoData } = photos;
        const data = await fetchPhotos(pagination);
        if (photoData && photoData.documents && !!pagination.skip) {
          data.documents.unshift(...photoData.documents);
        }
        setPhotos((prevState) => ({ ...prevState, data, loading: false }));
      } catch (error) {
        setPhotos((prevState) => ({ ...prevState, error, loading: false }));
      }
    })();
  }, [pagination]);

  const _handlePhotoPreview = useCallback((photo) => setPhotoPreview(photo), []);

  const _handleSelectPhoto = (photo) => {
    const nextPhotoSelecteds = [...photoSelecteds];
    nextPhotoSelecteds.push(photo);
    setPhotoSelecteds(nextPhotoSelecteds);
  };

  const _handleUnSelectPhoto = (photoId) => {
    const nextPhotoSelecteds = photoSelecteds.filter(({ id }) => id !== photoId);
    setPhotoSelecteds(nextPhotoSelecteds);
  };

  const _handleUpload = useCallback((photos, callback) => {
    try {
      (async function () {
        await uploadPhotos(photos);
        callback();
        toast.success('Upload photos success.');
      })();
    } catch (err) {
      toast.error(err.message);
    }
  }, []);

  const _handleDeletePhotos = () => {
    const photoList = transformPhotos(photoSelecteds);
    try {
      (async function () {
        const message = await deletePhotos(photoList);
        if (message === 'OK') {
          const { data } = photos;
          const nextDocuments = data.documents.filter((photo) => {
            return !photoSelecteds.find(({ id }) => photo.id === id);
          });
          data.documents = nextDocuments;
          setPhotos({ ...photos, data });
          setPhotoSelecteds([]);
          toast.success('Delete successful.');
        }
      })();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const _handleDeletePhoto = (photo) => {
    try {
      (async function () {
        const message = await deletePhoto(photo);
        if (message === 'OK') {
          const { data } = photos;
          const nextDocuments = data.documents.filter(({ id }) => id !== photo.id);
          const nextPhotoSelecteds = photoSelecteds.filter(({ id }) => id !== photo.id);
          data.documents = nextDocuments;
          setPhotos({ ...photos, data });
          setPhotoSelecteds(nextPhotoSelecteds);
          toast.success('Delete photo successful.');
        }
      })();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const _handleLoadMore = () => {
    const { count } = photos.data;
    console.log(window.screenY);
    setPagination((prevState) => ({
      ...prevState,
      skip: prevState.skip + count,
    }));
  };

  const { loading, error, data } = photos;

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    toast.error(error.message);
    return null;
  }

  return (
    <>
      <ToolBar
        photoCount={photoSelecteds.length}
        limit={pagination.limit}
        onUploads={() => setIsUpload(true)}
        onDeletePhotos={_handleDeletePhotos}
        onChange={(e) => setPagination({ skip: 0, limit: e.target.value })}
      />
      <div>
        {isUpload && (
          <Upload onSubmit={_handleUpload} onClose={() => setIsUpload(false)} />
        )}
        <Row>
          {data.documents.map((photo) => {
            const isSelected = photoSelecteds.find(({ id }) => id === photo.id);
            return (
              <Col key={photo.id}>
                <PhotoItem
                  photo={photo}
                  selected={isSelected}
                  isBlur={photoSelecteds.length && !isSelected}
                  actions={{
                    onSelect: () => _handleSelectPhoto(photo),
                    onUnSelect: () => _handleUnSelectPhoto(photo.id),
                    onPreview: () => _handlePhotoPreview(photo),
                    onDelete: () => _handleDeletePhoto(photo),
                  }}
                />
              </Col>
            );
          })}
        </Row>
        {!(data.count < pagination.limit) && (
          <button onClick={_handleLoadMore} className={styles.loadmore}>
            Load more
          </button>
        )}
        {!!photoPreview && (
          <PhotoPreview
            onClose={() => _handlePhotoPreview(null)}
            photoPreview={photoPreview}
          />
        )}
      </div>
    </>
  );
}

export default Core;
