import { Component } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { getHits } from 'api';
import Skeleton from 'components/Skeleton';
import ImageGalleryItem from 'components/ImageGalleryItem';
import ErrorMessage from 'components/ErrorMessage/ErrorMessage';
import Button from 'components/Button';
import { GalleryList, Li } from './ImageGallery.styled';

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

  async componentDidUpdate(prevProps, prevState) {
    const { page } = this.state;
    const { searchQuery } = this.props;
    if (prevProps.searchQuery !== searchQuery) {
      await this.setState({
        page: 1,
        hits: [],
      });
      this.fetchHits();
    }
    if (prevState.page !== page) {
      this.fetchHits();
    }
  }

  fetchHits = async () => {
    const { perPage, page } = this.state;
    const { searchQuery } = this.props;

    await this.setState({ status: STATUS.PENDING });

    try {
      const data = await getHits({ searchQuery, perPage, page });

      if (searchQuery === '') {
        this.setState(setState => ({
          hits: [...setState.hits],
        }));
        return toast.error('Please enter the query!');
      }

      if (data.hits.length === 0) {
        throw Error(`No matches found with "${this.props.searchQuery}"`);
      }

      this.setState(prevState => ({
        hits: [...prevState.hits, ...data.hits],
        status: STATUS.RESOLVED,
        totalHits: data.totalHits,
        totalPages: Math.ceil(data.totalHits / perPage),
      }));
    } catch (error) {
      this.setState({ status: STATUS.REJECTED });
      return toast.error(error.message);
    }
  };

  handleLoardMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { hits, status, page, perPage } = this.state;
    const showLoadMoreButton = hits.length !== 0 && page < perPage;

    if (status === STATUS.PENDING) {
      return <Skeleton />;
    }

    if (status === STATUS.RESOLVED) {
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
          {showLoadMoreButton && (
            <Button
              onClick={this.handleLoardMore}
              disabled={status === STATUS.PENDING ? true : false}
            >
              {status === STATUS.PENDING ? 'Loading...' : 'Loard more'}
            </Button>
          )}
        </>
      );
    }

    if (status === STATUS.REJECTED) {
      return <ErrorMessage />;
    }
  }
}

ImageGallery.propTypes = {
  searchQuery: PropTypes.string,
  hits: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ).isRequired,
  loading: PropTypes.bool.isRequired,
  status: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
  perPage: PropTypes.number.isRequired,
  totalHits: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
};

export default ImageGallery;
