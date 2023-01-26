import { useState, useEffect } from 'react';

import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

import './comicsList.scss';

const ComicsList = () => {
  const [comicsList, setComicsList] = useState([]);
  const [offset, setOffset] = useState(500);
  // eslint-disable-next-line
  const [startOffset, setStartOffset] = useState(500);
  // eslint-disable-next-line
  const [limit, setLimit] = useState(8);
  const [charEnded, setCharEnded] = useState(false);
  const [newItemLoading, setNewItemLoading] = useState(false);
  const { loading, error, clearError, getAllComics } = useMarvelService();

  useEffect(() => {
    if (startOffset === offset) {
      onRequest();
    }
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (newItemLoading) {
      onRequest();
    }
    //eslint-disable-next-line
  }, [newItemLoading]);

  useEffect(() => {
    window.addEventListener('scroll', onRequestByScroll);
    return () => window.removeEventListener('scroll', onRequestByScroll);
    //eslint-disable-next-line
  }, [comicsList]);

  const onRequest = (limitParam = limit) => {
    clearError();
    getAllComics(offset, limitParam)
      .then((newComicsList) => onComicsListLoaded(newComicsList, limitParam))
      .catch(() => setNewItemLoading(false));
  };

  const onRequestByScroll = () => {
    if (
      comicsList.length > 15 &&
      window.pageYOffset + document.documentElement.clientHeight >=
        document.documentElement.scrollHeight - 1
    ) {
      setNewItemLoading(true);
    }
  };

  const onComicsListLoaded = (newComicsList, limitParam = limit) => {
    let ended = false;
    if (newComicsList.length < limitParam) {
      ended = true;
      window.removeEventListener('scroll', onRequestByScroll);
    }

    setComicsList((comicsList) => {
      const newArr = [...comicsList, ...newComicsList];
      return newArr;
    });
    setOffset((offset) => offset + limit);
    setNewItemLoading(false);
    setCharEnded(ended);
  };

  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading && !newItemLoading ? <Spinner /> : null;

  return (
    <div className='comics__list'>
      {errorMessage}
      {spinner}
      <List comicsList={comicsList} />
      <button
        onClick={() => setNewItemLoading(true)}
        disabled={newItemLoading}
        className='button button__main button__long'
        style={{ display: charEnded ? 'none' : 'block' }}>
        <div className='inner'>load more</div>
      </button>
    </div>
  );
};

const List = (props) => {
  const content = props.comicsList.map((comic) => {
    const { id, href, thumbnail, name, price } = comic;
    return (
      <li
        key={id}
        className='comics__item'>
        <a href={href}>
          <img
            src={thumbnail}
            alt='name'
            className='comics__item-img'
          />
          <div className='comics__item-name'>{name}</div>
          <div className='comics__item-price'>{price}</div>
        </a>
      </li>
    );
  });
  return <ul className='comics__grid'>{content}</ul>;
};

export default ComicsList;
