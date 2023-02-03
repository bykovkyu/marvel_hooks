import './singleCharPage.scss';

const SingleCharPage = ({ data }) => {
  const { fullname, thumbnail, description } = data;
  return (
    <>
      <div className='single-char'>
        <img
          src={thumbnail}
          alt={fullname}
          className='single-char__img'
        />
        <div className='single-char__info'>
          <h2 className='single-char__name'>{fullname}</h2>
          <p className='single-char__descr'>{description}</p>
        </div>
      </div>
    </>
  );
};

export default SingleCharPage;
