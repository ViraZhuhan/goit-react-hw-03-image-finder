import { Component } from 'react';
import { createPortal } from 'react-dom';
import { Overlay, WrapModal } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handlerBackdropClick = e => {
    if (e.target === e.currentTarget) {
      this.props.onClose();
    }
  };

  render() {
    const { children } = this.props;

    return createPortal(
      <Overlay onClick={this.handlerBackdropClick}>
        <WrapModal>
          <image>{children}</image>
        </WrapModal>
      </Overlay>,
      modalRoot
    );
  }
}

export default Modal;
