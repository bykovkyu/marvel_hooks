import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import MarvelService from '../../services/MarvelService';

import './charList.scss';

const CharList = (props) => {
  const [charList, setCharList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [newItemLoading, setNewItemLoading] = useState(false);
  // eslint-disable-next-line
  const [startOffset, setStartOffset] = useState(360);
  const [offset, setOffset] = useState(360);
  const [charEnded, setCharEnded] = useState(false);
  // eslint-disable-next-line
  const [limit, setLimit] = useState(9);

  useEffect(() => {
    if (newItemLoading) {
      onRequest();
    }
    // eslint-disable-next-line
  }, [newItemLoading]);

  useEffect(() => {
    if (startOffset === offset) {
      firstLoading();
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', onRequestByScroll);
    return () => window.removeEventListener('scroll', onRequestByScroll);
    // eslint-disable-next-line
  }, [charList]);

  const charsRefs = useRef([]);

  const marvelService = new MarvelService();

  const onCharListLoading = () => {
    setNewItemLoading(true);
    setError(false);
  };

  const onRequestByScroll = () => {
    if (
      charList.length > 15 &&
      window.pageYOffset + document.documentElement.clientHeight >=
        document.documentElement.scrollHeight - 1
    ) {
      setNewItemLoading(true);
    }
  };

  const onCharListLoaded = (newCharList, limitParam = limit) => {
    let ended = false;
    if (newCharList.length < limitParam) {
      ended = true;
      window.removeEventListener('scroll', onRequestByScroll);
    }

    setCharList((charList) => {
      const newArr = [...charList, ...newCharList];
      localStorage.setItem('limit', newArr.length);
      return newArr;
    });

    setLoading(false);
    setError(false);
    setNewItemLoading(false);
    setOffset((offset) => offset + limitParam);
    setCharEnded(ended);
  };

  const onError = () => {
    setError(true);
    setLoading(false);
    setNewItemLoading(false);
  };

  const onRequest = (limit) => {
    marvelService
      .getAllCharacters(offset, limit)
      .then((newCharList) => onCharListLoaded(newCharList, limit))
      .catch(onError);
  };

  const firstLoading = () => {
    let limitInLS = localStorage.getItem('limit');
    if (limitInLS && +limitInLS > 9) {
      limitInLS = +limitInLS;

      if (limitInLS > 100) {
        localStorage.setItem('limit', 100);
        limitInLS = 100;
      }

      onRequest(limitInLS);
    } else {
      onRequest();
    }
  };

  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || error) ? (
    <List
      chars={charList}
      onCharSelected={props.onCharSelected}
      myRefs={charsRefs}
    />
  ) : null;

  return (
    <div className='char__list'>
      {errorMessage}
      {spinner}
      {content}
      <button
        className='button button__main button__long'
        disabled={newItemLoading}
        style={{
          display: charEnded ? 'none' : 'block',
        }}
        onClick={onCharListLoading}>
        <div className='inner'>load more</div>
      </button>
    </div>
  );
};

CharList.propTypes = {
  onCharSelected: PropTypes.func,
};

const List = ({ chars, onCharSelected, myRefs }) => {
  const content = chars.map((char, i) => {
    const { id, name, thumbnail } = char;
    return (
      <li
        key={id}
        tabIndex={0}
        ref={(el) => (myRefs.current[i] = el)}
        onClick={(e) => onCharSelected(id, e.currentTarget, myRefs)}
        onKeyPress={(e) => {
          if (e.key === ' ' || e.key === 'Enter') {
            e.preventDefault();
            onCharSelected(id, e.currentTarget, myRefs);
          }
        }}
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
