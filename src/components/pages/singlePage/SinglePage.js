import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import useMarvelService from '../../../services/MarvelService';

import AppBanner from '../../appBanner/AppBanner';
import Spinner from '../../spinner/Spinner';
import ErrorMessage from '../../errorMessage/ErrorMessage';

const SinglePage = ({ Component, contentType }) => {
  const { id } = useParams();

  const [data, setData] = useState(null);

  useEffect(() => {
    updateChar(id);
    //eslint-disable-next-line
  }, [id]);

  const { loading, error, clearError, getCharacter, getComic } = useMarvelService();

  const updateChar = (id) => {
    clearError();
    switch (contentType) {
      case 'comic':
        getComic(id).then((res) => {
          onDataLoaded(res);
        });
        break;
      case 'character':
        getCharacter(id).then(onDataLoaded);
        break;
      default:
        break;
    }
  };

  const onDataLoaded = (data) => {
    setData(data);
  };

  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(error || loading || !data) ? <Component data={data} /> : null;

  return (
    <>
      <AppBanner />
      {errorMessage}
      {spinner}
      {content}
    </>
  );
};

export default SinglePage;
