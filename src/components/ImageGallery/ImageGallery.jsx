import ImageGalleryItem from 'components/ImageGalleryItem';
import { GalleryList, Li } from './ImageGallery.styled';
// import PropTypes from 'prop-types';
import { Component } from 'react';

const STATUS = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

class ImageGallery extends Component {
  state = {
    searchQuery: '',
    hits: [],
    loading: false,
    status: STATUS.IDLE,
    page: 1,
    perPage: 12,
    totalHits: 0,
    totalPages: 0,
  };

  render() {
    const { hits } = this.props;

    return (
      <GalleryList>
              {hits.map(({ id, largeImageURL, webformatURL, tags }) => {
          return (
            <Li key={id}>
              <ImageGalleryItem
              id={id}
              webformatURL={webformatURL}
              tags={tags}
            />
            </Li>
          );
        })}
      </GalleryList>      
    );
  }
}

// ImageGallery.propTypes = {
//   data: PropTypes.arrayOf(PropTypes.exact({
//     id: PropTypes.number.isRequired,
//     largeImageURL: PropTypes.string.isRequired,
//     tags: PropTypes.string.isRequired
//   })).isRequired,
// }

export default ImageGallery;
