import { useState, useEffect } from 'react';

import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

import './singleComic.scss';
import xMen from '../../resources/img/x-men.png';

const SingleComic = (props) => {
  const { comicId } = props;

  const [comic, setComic] = useState({});
  const { loading, error, clearError, getComic } = useMarvelService();

  useEffect(() => {
    updateComic();
    //eslint-disable-next-line
  }, [comicId]);

  const updateComic = () => {
    if (!comicId) {
      return;
    }
    clearError();
    getComic(comicId).then(onComicLoaded);
  };

  const onComicLoaded = (comic) => {
    setComic(comic);
  };

  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;
  const { thumbnail, name, description, pageCount, language, price } = comic;
  const content =
    comic && !(error || loading) ? (
      <div className='single-comic'>
        <img
          src={thumbnail}
          alt='x-men'
          className='single-comic__img'
        />
        <div className='single-comic__info'>
          <h2 className='single-comic__name'>{name}</h2>
          <p className='single-comic__descr'>{description}</p>
          <p className='single-comic__descr'>{pageCount} pages</p>
          <p className='single-comic__descr'>Language: {language}</p>
          <div className='single-comic__price'>{price}</div>
        </div>
        <a
          href='#'
          className='single-comic__back'>
          Back to all
        </a>
      </div>
    ) : null;

  console.log('render');

  return (
    <>
      {errorMessage}
      {spinner}
      {content}
    </>
  );
};

export default SingleComic;
