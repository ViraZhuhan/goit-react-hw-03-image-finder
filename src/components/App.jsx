import { Component } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import PropTypes from 'prop-types';
import { ToastContainer } from 'react-toastify';
import debounce from 'lodash.debounce';
import { getHits } from 'api';
import Searchbar from './Searchbar';
import Skeleton from './Skeleton/Skeleton';
import ImageGallery from './ImageGallery';
import Button from './Button/Button';
import ErrorMessage from './ErrorMessage/ErrorMessage';
import { Container } from './App.styled';

const STATUS = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export default class App extends Component {
  state = {
    searchQuery: '',
    hits: [],
    loading: false,
    status: STATUS.IDLE,
    page: 1,
    perPage: 12,
    totalHits: 0,
    totalPages: 0,
    error: '',
  };

  async componentDidUpdate(prevProps, prevState) {
    const { searchQuery, page } = this.state;

    if (prevState.searchQuery !== searchQuery || prevState.page !== page) {
      this.fetchHits();
    }
  }

  fetchHits = async () => {
    const { searchQuery, perPage, page } = this.state;

    await this.setState({ status: STATUS.PENDING });

    try {
      const data = await getHits({ searchQuery, perPage, page });

      if (data.hits.length === 0) {
        throw Error(`No matches found with "${searchQuery}"`);
      }

      this.setState(prevState => ({
        hits: [...prevState.hits, ...data.hits],
        status: STATUS.RESOLVED,
        totalHits: data.totalHits,
        totalPages: Math.ceil(data.totalHits / perPage),
      }));
    } catch (error) {
      this.setState({ error: error.message, status: STATUS.REJECTED });
    }
  };

  handleChangeSearchQuery = debounce(searchQuery => {
    this.setState({
      searchQuery,
      page: 1,
      hits: [],
    });
  }, 1000);

  handleLoardMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { status, error, hits, page, totalPages } = this.state;
    const showLoadMoreButton = hits.length !== 0 && page < totalPages;

    return (
      <Container>
        <ToastContainer autoClose={3000} theme={'colored'} />
        <Searchbar onSubmit={this.handleChangeSearchQuery} />
        {status === STATUS.PENDING && <Skeleton />}
        {hits.length > 0 && <ImageGallery hits={hits} />}
        {showLoadMoreButton && (
          <Button
            onClick={this.handleLoardMore}
            disabled={status === STATUS.PENDING ? true : false}
          >
            {status === STATUS.PENDING ? 'Loading...' : 'Loard more'}
          </Button>
        )}
        {status === STATUS.REJECTED && <ErrorMessage>{error}</ErrorMessage>}
      </Container>
    );
  }
}

App.propTypes = {
  searchQuery: PropTypes.string,
  hits: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  status: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
  perPage: PropTypes.number.isRequired,
  totalHits: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  error: PropTypes.string.isRequired,
};
