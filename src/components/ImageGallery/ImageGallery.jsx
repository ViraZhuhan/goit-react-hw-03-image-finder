import PropTypes from 'prop-types';
import ImageGalleryItem from 'components/ImageGalleryItem';
import { GalleryList, Li } from './ImageGallery.styled';

const ImageGallery = ({ hits }) => {
  return (
    <>
      <GalleryList>
        {hits.map(({ id, webformatURL, tags, largeImageURL }) => {
          return (
            <Li key={id}>
              <ImageGalleryItem
                id={id}
                webformatURL={webformatURL}
                tags={tags}
                largeImageURL={largeImageURL}
              />
            </Li>
          );
        })}
      </GalleryList>
    </>
  );
};

ImageGallery.propTypes = {
  hits: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
      webformatURL: PropTypes.string.isRequired,
    })
  ),
};

export default ImageGallery;
