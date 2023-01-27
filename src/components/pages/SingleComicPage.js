import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

import './singleComicPage.scss';

const SingleComicPage = () => {
  const { comicId } = useParams();

  const [comic, setComic] = useState({});
  const { loading, error, clearError, getComic } = useMarvelService();

  useEffect(() => {
    updateComic();
    //eslint-disable-next-line
  }, [comicId]);

  const updateComic = () => {
    clearError();
    getComic(comicId).then(onComicLoaded);
  };

  const onComicLoaded = (comic) => {
    setComic(comic);
  };

  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(error || loading || !comic) ? <View comic={comic} /> : null;

  return (
    <>
      {errorMessage}
      {spinner}
      {content}
    </>
  );
};

const View = ({ comic }) => {
  const { thumbnail, name, description, pageCount, language, price } = comic;
  const navigate = useNavigate();

  return (
    <div className='single-comic'>
      <img
        src={thumbnail}
        alt={name}
        className='single-comic__img'
      />
      <div className='single-comic__info'>
        <h2 className='single-comic__name'>{name}</h2>
        <p className='single-comic__descr'>{description}</p>
        <p className='single-comic__descr'>{pageCount} pages</p>
        <p className='single-comic__descr'>Language: {language}</p>
        <div className='single-comic__price'>{price}</div>
      </div>
      <div
        style={{ cursor: 'pointer' }}
        onClick={() => navigate(-1)}
        className='single-comic__back'>
        Go to back
      </div>
    </div>
  );
};

export default SingleComicPage;
