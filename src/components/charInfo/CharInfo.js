import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import MarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import Skeleton from '../skeleton/Skeleton';

import './charInfo.scss';

const CharInfo = (props) => {
  const [char, setChar] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const marvelService = new MarvelService();

  useEffect(() => {
    updateChar();
    // eslint-disable-next-line
  }, [props.charId]);

  const updateChar = () => {
    if (!props.charId) {
      return;
    }

    onCharLoading();

    marvelService.getCharacter(props.charId).then(onCharLoaded).catch(onError);
  };

  const onCharLoading = () => {
    setLoading(true);
    setError(false);
  };

  const onCharLoaded = (char) => {
    setChar(char);
    setLoading(false);
    setError(false);
  };

  const onError = () => {
    setLoading(false);
    setError(true);
  };

  const skeleton = !(char || loading || error) ? <Skeleton /> : null;
  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || error || !char) ? <View char={char} /> : null;

  return (
    <div
      className='char__info'
      style={{
        maxHeight: `${document.documentElement.clientHeight - 30}px`,
        overflow: 'auto',
      }}>
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
    const { name } = item;
    return (
      <li
        key={i}
        className='char__comics-item'>
        {name}
      </li>
    );
  });
  return <>{content}</>;
};

Comics.propTypes = {
  comics: PropTypes.array,
};

export default CharInfo;
