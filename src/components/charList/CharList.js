import { Component } from 'react';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import MarvelService from '../../services/MarvelService';

import './charList.scss';

class CharList extends Component {
  state = {
    chars: [],
    offset: 109,
    loading: true,
    error: false,
    loadingMore: false,
    errorMore: false,
  };

  componentDidMount() {
    this.updateCharList();
  }

  marvelService = new MarvelService();

  //First load list

  onCharsLoading = () => {
    this.setState({ loading: true, error: false });
  };

  onError = () => {
    this.setState({
      loading: false,
      error: true,
    });
  };

  onCharsLoaded = (chars) => {
    this.setState((state) => ({ chars, offset: state.offset + 9, loading: false, error: false }));
  };

  updateCharList = () => {
    this.onCharsLoading();
    this.marvelService
      .getAllCharacters(this.state.offset)
      .then(this.onCharsLoaded)
      .catch(this.onError);
  };

  // Load more chars

  onMoreCharsLoading = () => {
    this.setState({ loadingMore: true, errorMore: false });
  };

  onErrorMore = () => {
    this.setState({
      loadingMore: false,
      errorMore: true,
    });
  };

  onMoreCharsLoaded = (chars) => {
    this.setState((state) => ({
      chars: [...state.chars, ...chars],
      offset: state.offset + 9,
      loadingMore: false,
      errorMore: false,
    }));
  };

  loadMoreChars = () => {
    this.onMoreCharsLoading();
    this.marvelService.getAllCharacters(this.state.offset).then(this.onMoreCharsLoaded);
  };

  render() {
    const { chars, loading, error, loadingMore, errorMore } = this.state;

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error) ? (
      <List
        chars={chars}
        onCharSelected={this.props.onCharSelected}
      />
    ) : null;
    const errorMessageMore = errorMore ? <ErrorMessage /> : null;
    const spinnerMore = loadingMore ? <Spinner /> : null;

    return (
      <div className='char__list'>
        {errorMessage}
        {spinner}
        {content}
        {errorMessageMore}
        {spinnerMore}
        <button
          className='button button__main button__long'
          onClick={this.loadMoreChars}>
          <div className='inner'>load more</div>
        </button>
      </div>
    );
  }
}

const List = ({ chars, onCharSelected }) => {
  const content = chars.map((char) => {
    const { id, name, thumbnail } = char;
    return (
      <li
        key={id}
        onClick={() => onCharSelected(id)}
        className='char__item'>
        <img
          src={thumbnail}
          alt={name}
        />
        <div className='char__name'>{name}</div>
      </li>
    );
  });
  return <ul className='char__grid'>{content}</ul>;
};

export default CharList;
