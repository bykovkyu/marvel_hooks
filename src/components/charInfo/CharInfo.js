import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import Skeleton from '../skeleton/Skeleton';

import './charInfo.scss';

const CharInfo = (props) => {
  const [char, setChar] = useState(null);
  const { loading, error, clearError, getCharacter } = useMarvelService();

  useEffect(() => {
    updateChar();
    // eslint-disable-next-line
  }, [props.charId]);

  const updateChar = () => {
    if (!props.charId) {
      return;
    }

    clearError();

    getCharacter(props.charId).then(onCharLoaded);
  };

  const onCharLoaded = (char) => {
    setChar(char);
  };

  const skeleton = !(char || loading || error) ? <Skeleton /> : null;
  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || error || !char) ? <View char={char} /> : null;

  // console.log('render');

  return (
    <div className='char__info'>
      {skeleton}
      {errorMessage}
      {spinner}
      {content}
    </div>
  );
};

const View = ({ char }) => {
  const { name, thumbnail, description, homepage, wiki, comics } = char;
  return (
    <>
      <div className='char__basics'>
        <img
          src={thumbnail}
          alt={name}
        />
        <div>
          <div className='char__info-name'>{name}</div>
          <div className='char__btns'>
            <a
              href={homepage}
              className='button button__main'>
              <div className='inner'>homepage</div>
            </a>
            <a
              href={wiki}
              className='button button__secondary'>
              <div className='inner'>Wiki</div>
            </a>
          </div>
        </div>
      </div>
      <div className='char__descr'>{description}</div>
      <div className='char__comics'>Comics:</div>
      <ul className='char__comics-list'>
        {comics.length === 0 ? (
          'There is no comics with this character'
        ) : (
          <Comics comics={comics} />
        )}
      </ul>
    </>
  );
};

CharInfo.propTypes = {
  charId: PropTypes.number,
};

const Comics = ({ comics }) => {
  const content = comics.map((item, i) => {
    const { name, resourceURI } = item;
    const comicId = resourceURI.split('/').pop();
    return (
      <li
        key={i}
        className='char__comics-item'>
        <Link to={`comics/${comicId}`}>{name}</Link>
      </li>
    );
  });
  return <>{content}</>;
};

Comics.propTypes = {
  comics: PropTypes.array,
};

export default CharInfo;
