import { PerComponent } from 'react';
import 'react-toastify/dist/ReactToastify.css';
// import PropTypes from 'prop-types';
import { ToastContainer, toast } from 'react-toastify';
import debounce from 'lodash.debounce';
import { getHits } from 'api';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Skeleton from './Skeleton/Skeleton';
import ErrorMessage from './ErrorMessage/ErrorMessage';
import Button from './Button/Button';
import { Container } from './App.styled';

const STATUS = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export default class App extends PerComponent {
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

  componentDidUpdate(_, prevState) {
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
        throw Error(`No matches found with "${this.state.searchQuery}"`);
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

  handleChangeSearchQuery = debounce(searchQuery => {
    this.setState({
      searchQuery,
      page: 1,
      hits: [],
    });
  }, 1000);

  render() {
    const { hits, page, perPage, status, searchQuery } = this.state;
    const showLoadMoreButton = hits.length !== 0 && page < perPage;

    return (
      <Container>
        <Searchbar onSubmit={this.handleChangeSearchQuery} />
        <ToastContainer autoClose={5000} theme={'colored'} />
        {status === STATUS.PENDING && <Skeleton />}
        {status === STATUS.RESOLVED && <ImageGallery searchQuery={searchQuery} hits={hits} />}
        {status === STATUS.REJECTED && <ErrorMessage />}
        {showLoadMoreButton && (
          <Button
            onClick={this.handleLoardMore}
            disabled={status === STATUS.PENDING ? true : false}
          >
            {status === STATUS.PENDING ? 'Loading...' : 'Loard more'}
          </Button>
        )}
      </Container>
    );
  }
}
