import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';

import useMarvelService from '../../services/MarvelService';
import SmallSpinner from '../spinner/SmallSpinner';

import './charSearchFormV3.scss';

const CharSearchForm = () => {
  const [char, setChar] = useState(null);

  const { loading, error, clearError, getCharacterByName } = useMarvelService();

  const navigate = useNavigate();

  const updateChar = (name) => {
    clearError();
    getCharacterByName(name).then(onCharLoaded);
  };

  const onCharLoaded = (char) => {
    setChar(char);
  };

  const hasFound = !char ? null : char.length > 0 ? (
    <div className='search-form__results'>
      <Formik
        initialValues={{ results: '' }}
        validationSchema={Yup.object({
          results: Yup.string().required('This field is required'),
        })}
        onSubmit={({ results }) => {
          /* if (results !== '') */ navigate(`/characters/${results}`);
        }}>
        <Form className='search-form__results-form'>
          <Field
            className='search-form__results-select'
            component='select'
            id='results'
            name='results'>
            <option
              key={0}
              className='search-form__results-item_placeholder'
              value=''
              disabled>
              Please select a character
            </option>
            {char
              .filter(
                (char) =>
                  char.thumbnail !==
                    'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg' &&
                  char.description !== 'NO DESCRIPTION'
              )
              .map((char) => (
                <option
                  key={char.id}
                  className='search-form__results-item'
                  value={char.id}>
                  {char.fullname}
                </option>
              ))}
          </Field>
          <button
            className='button button__secondary search-form__result-btn'
            type='submit'>
            <div className='inner'>TO PAGE</div>
          </button>
        </Form>
      </Formik>
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

  return (
    <Formik
      initialValues={{ charName: '' }}
      validationSchema={Yup.object({
        charName: Yup.string().required('This field is required'),
      })}
      onSubmit={({ charName }) => {
        updateChar(charName);
      }}>
      <div className='search-form'>
        <Form
          className='search-form__form'
          onChange={() => {
            if (char) setChar(null);
          }}>
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
