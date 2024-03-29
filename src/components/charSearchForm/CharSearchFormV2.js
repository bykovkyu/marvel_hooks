import { useState } from 'react';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Link } from 'react-router-dom';

import useMarvelService from '../../services/MarvelService';
import SmallSpinner from '../spinner/SmallSpinner';

import './charSearchForm.scss';

const CharSearchForm = () => {
  const [char, setChar] = useState(null);

  const { loading, error, clearError, getCharacterByName } = useMarvelService();

  const updateChar = (name) => {
    clearError();
    getCharacterByName(name).then(onCharLoaded);
  };

  const onCharLoaded = (char) => {
    setChar(char);
  };

  const hasFound = !char ? null : char.length > 0 ? (
    <div className='search-form__result'>
      <div className='search-form__result_found'>There is! Visit {char[0].name} page?</div>
      <Link
        to={`/characters/${char[0].id}`}
        className='button button__secondary search-form__result-btn'>
        <div className='inner'>TO PAGE</div>
      </Link>
    </div>
  ) : (
    <div className='search-form__error'>
      The character was not found. Check the name and try again
    </div>
  );
  const spinner = loading ? <SmallSpinner /> : null;
  const errorMessage = error ? (
    <div className='search-form__error'>The service not available. Please try again later.</div>
  ) : null;

  console.log('render');
  return (
    <Formik
      initialValues={{ charName: '' }}
      validationSchema={Yup.object({
        charName: Yup.string().required('This field is required'),
      })}
      onSubmit={({ charName }) => {
        updateChar(charName);
      }}
      validate={() => {
        if (char) {
          setChar(null);
        }
      }}>
      <div className='search-form'>
        <Form className='search-form__form'>
          <label
            htmlFor='charName'
            className='search-form__title'>
            Or find a character by name:
          </label>
          <Field
            className='search-form__input'
            id='charName'
            name='charName'
            placeholder='Enter name'
            type='text'
          />
          <button
            className='button button__main search-form__btn'
            type='submit'
            disabled={loading}>
            <div className='inner'>FIND</div>
          </button>
        </Form>
        <ErrorMessage
          className='search-form__error'
          name='charName'
          component={'div'}
        />
        {hasFound}
        {spinner}
        {errorMessage}
      </div>
    </Formik>
  );
};

export default CharSearchForm;
