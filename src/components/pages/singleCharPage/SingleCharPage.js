import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import useMarvelService from '../../../services/MarvelService';
import ErrorMessage from '../../errorMessage/ErrorMessage';
import Spinner from '../../spinner/Spinner';
import AppBanner from '../../appBanner/AppBanner';

import './singleCharPage.scss';

const SingleCharPage = () => {
  const { charName } = useParams();

  const [char, setChar] = useState({});

  useEffect(() => {
    updateChar(charName);
    //eslint-disable-next-line
  }, [charName]);

  const { loading, error, clearError, getCharacterByName } = useMarvelService();

  const updateChar = (name) => {
    clearError();
    getCharacterByName(name).then(onCharLoaded);
  };

  const onCharLoaded = (char) => {
    setChar(char);
  };

  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(error || loading || !char) ? <View char={char} /> : null;

  return (
    <>
      {errorMessage}
      {spinner}
      {content}
    </>
  );
};

const View = ({ char }) => {
  const { thumbnail, name, description } = char;

  return (
    <>
      <AppBanner />
      <div className='single-char'>
        <img
          src={thumbnail}
          alt={name}
          className='single-char__img'
        />
        <div className='single-char__info'>
          <h2 className='single-char__name'>{name}</h2>
          <p className='single-char__descr'>{description}</p>
        </div>
      </div>
    </>
  );
};

export default SingleCharPage;
