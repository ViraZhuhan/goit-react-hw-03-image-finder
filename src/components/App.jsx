import { Component } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import PropTypes from 'prop-types';
import { ToastContainer } from 'react-toastify';
import debounce from 'lodash.debounce';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import { Container } from './App.styled';

export default class App extends Component {
  state = {
    searchQuery: '',
  };

  handleChangeSearchQuery = debounce(searchQuery => {
    this.setState({
      searchQuery,
    });
  }, 1000);

  render() {
    const { searchQuery } = this.state;

    return (
      <Container>
        <ToastContainer autoClose={3000} theme={'colored'} />
        <Searchbar onSubmit={this.handleChangeSearchQuery} />
        <ImageGallery searchQuery={searchQuery} />
      </Container>
    );
  }
}

App.propTypes = {
  searchQuery: PropTypes.string,
};
