import { Component } from 'react';
import PropTypes from 'prop-types';

import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import MarvelService from '../../services/MarvelService';

import './charList.scss';

class CharList extends Component {
  state = {
    charList: [],
    loading: true,
    error: false,
    newItemLoading: false,
    startOffset: 360,
    offset: 360,
    charEnded: false,
    limit: 9,
  };

  marvelService = new MarvelService();

  componentDidMount() {
    this.onFirstLoading();
  }

  onFirstLoading = () => {
    let limitInLS = +localStorage.getItem('limit');
    if (limitInLS > 100) {
      localStorage.setItem('limit', 100);
      limitInLS = 100;
    }

    const { startOffset, offset } = this.state;
    if (limitInLS && limitInLS > 9 && startOffset === offset) {
      this.onRequest(offset, limitInLS);
    } else {
      this.onRequest();
    }

    window.addEventListener('scroll', this.onRequestByScroll);
  };

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onRequestByScroll);
  }

  onRequest = (offset, limit) => {
    this.onCharListLoading();
    this.marvelService
      .getAllCharacters(offset, limit)
      .then((newCharList) => this.onCharListLoaded(newCharList, offset, limit))
      .catch(this.onError);
  };

  onCharListLoading = () => {
    this.setState({ newItemLoading: true, error: false });
  };

  onCharListLoaded = (newCharList, offset = this.state.offset, limit = this.state.limit) => {
    let ended = false;
    if (newCharList.length < limit) {
      ended = true;
      window.removeEventListener('scroll', this.onRequestByScroll);
    }

    this.setState(({ charList }) => {
      const newArr = [...charList, ...newCharList];
      localStorage.setItem('limit', newArr.length);
      return {
        charList: newArr,
        loading: false,
        error: false,
        newItemLoading: false,
        offset: offset + limit,
        charEnded: ended,
      };
    });
  };

  onError = () => {
    this.setState({
      error: true,
      loading: false,
    });
  };

  // Scroll

  onRequestByScroll = () => {
    if (
      this.state.charList.length > 15 &&
      window.pageYOffset + document.documentElement.clientHeight >=
        document.documentElement.scrollHeight - 1
    ) {
      this.onRequest(this.state.offset);
    }
  };

  onResetNumberOfCharacters = () => {
    localStorage.removeItem('limit');
    this.setState((state) => ({
      offset: state.startOffset + state.limit,
      charList: state.charList.slice(0, state.limit),
    }));
  };

  render() {
    const { charList: chars, loading, error, newItemLoading, offset, charEnded } = this.state;

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error) ? (
      <List
        chars={chars}
        onCharSelected={this.props.onCharSelected}
      />
    ) : null;

    return (
      <div className='char__list'>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
          <button
            className='button button__main button__long'
            style={{ margin: '0' }}
            onClick={this.onResetNumberOfCharacters}>
            <div className='inner'>reset number of characters</div>
          </button>
          <div style={{ fontSize: '30px', alignSelf: 'center' }}>
            Number of characters: {chars.length}
          </div>
        </div>
        {errorMessage}
        {spinner}
        {content}
        <button
          className='button button__main button__long'
          disabled={newItemLoading}
          style={{
            display: charEnded ? 'none' : 'block',
          }}
          onClick={() => this.onRequest(offset)}>
          <div className='inner'>load more</div>
        </button>
      </div>
    );
  }
}

CharList.propTypes = {
  onCharSelected: PropTypes.func,
};

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

List.propTypes = {
  onCharSelected: PropTypes.func,
  chars: PropTypes.array,
};

export default CharList;
