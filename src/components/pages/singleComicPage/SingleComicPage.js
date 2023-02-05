import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import './singleComicPage.scss';

const SingleComicPage = ({ data }) => {
  const { thumbnail, name, description, pageCount, language, price } = data;
  const navigate = useNavigate();

  return (
    <div className='single-comic'>
      <Helmet>
        <meta
          name='description'
          content={`${name} comics book`}
        />
        <title>{name}</title>
      </Helmet>
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
