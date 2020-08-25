import { service } from './config';

const LIST_PHOTO = `/photos/list`;
export const PHOTOS = `/photos`;

export const fetchPhotos = async (config) => {
  try {
    const { data } = await service.post(LIST_PHOTO, config);
    return data;
  } catch (err) {
    throw new Error(err.message);
  }
};

export const uploadPhotos = async (photos) => {
  try {
    const { data } = await service.put(PHOTOS, photos);
    return data;
  } catch (err) {
    throw new Error(err.message);
  }
};

export const deletePhotos = async (photos) => {
  try {
    const { data } = await service({
      method: 'delete',
      url: PHOTOS,
      data: photos,
    });
    return data.message;
  } catch (err) {
    throw new Error(err.message);
  }
};

export const deletePhoto = async (photo) => {
  const album = photo.album.toLowerCase();
  try {
    const { data } = await service.delete(`${PHOTOS}/${album}/${photo.name}`);
    return data.message;
  } catch (err) {
    throw new Error(err.message);
  }
};
