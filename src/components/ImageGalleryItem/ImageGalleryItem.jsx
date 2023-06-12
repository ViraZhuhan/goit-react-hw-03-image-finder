import { Component } from 'react';
import { GalleryItem, GalleryImg } from './ImageGalleryItem.styled';
import PropTypes from 'prop-types';



export default class ImageGalleryItem extends Component {
 

  render() {
    const {tags, webformatURL } = this.props;
    return (
      <GalleryItem>
        {/* {this.state.error && <h1> {this.state.error.message}</h1>}
        {this.state.loading && <h1>loading...</h1>}
        {this.state.hits && <GalleryImg id={id} src={largeImageURL} alt={tags} />} */}
        <GalleryImg src={webformatURL} alt={tags} />
      </GalleryItem>
    );
  }
}

ImageGalleryItem.propTypes = {
  id: PropTypes.number.isRequired,
  tags: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  previewURL: PropTypes.string,
}