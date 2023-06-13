import { Component } from 'react';
import { toast } from 'react-toastify';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import PropTypes from 'prop-types';
import {
  Header,
  SearchForm,
  SearchButton,
  ButtonLabel,
  Input,
} from './Searchbar.styled';

export default class Searchbar extends Component {
  state = {
    searchQuery: '',
  };

  handleSumbit = e => {
    e.preventDefault();

    if (this.state.searchQuery.trim() === '') {
      return toast.error('Please enter the query!');
    }
    this.props.onSubmit(this.state.searchQuery);
    this.reset();
  };

  handleChange = e => {
    this.setState({ searchQuery: e.target.value });
  };

  reset = () => {
    this.setState({ searchQuery: '' });
  };

  render() {
    return (
      <Header>
        <SearchForm onSubmit={this.handleSumbit}>
          <SearchButton type="submit">
            <MagnifyingGlassIcon />
            <ButtonLabel>Search</ButtonLabel>
          </SearchButton>
          <Input
            type="text"
            autoComplete="off"
            placeholder="Search images and photos"
            name="searchQuery"
            onChange={this.handleChange}
          />
        </SearchForm>
      </Header>
    );
  }
}

Searchbar.propTypes = {
  searchQuery: PropTypes.string,
};
