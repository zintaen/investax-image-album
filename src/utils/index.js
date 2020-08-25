export const transformPhotos = (photos) => {
  const categories = photos.reduce((result, photo) => {
    const { name, album } = photo;
    let photosInAlbum = result[album] || '';
    photosInAlbum = photosInAlbum ? photosInAlbum + `, ${name}` : name;
    result[album] = photosInAlbum;
    return result;
  }, {});

  const result = Object.keys(categories).map((album) => {
    return {
      album,
      documents: categories[album],
    };
  });
  return result;
};
