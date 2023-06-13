import { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from 'components/Modal/Modal';
import { GalleryImg, ModalImg } from './ImageGalleryItem.styled';

export default class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
    console.log('showModal');
  };

  render() {
    const { tags, webformatURL, largeImageURL } = this.props;
    const { showModal } = this.state;

    return (
      <>
        <GalleryImg onClick={this.toggleModal} src={webformatURL} alt={tags} />
        {showModal && (
          <Modal onClose={this.toggleModal}>
            <ModalImg src={largeImageURL}></ModalImg>
          </Modal>
        )}
      </>
    );
  }
}

ImageGalleryItem.propType = {
  showModal: PropTypes.bool.isRequired,
};
