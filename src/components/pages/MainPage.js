import { useState } from 'react';

import RandomChar from '../randomChar/RandomChar';
import CharList from '../charList/CharList';
import CharInfo from '../charInfo/CharInfo';
import CharSearchForm from '../charSearchForm/CharSearchForm';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';
import decoration from '../../resources/img/vision.png';

const MainPage = () => {
  const [selectedChar, setChar] = useState(null);

  const onFocusChar = (selectedElem, myRefs) => {
    // myRefs = myRefs.filter((item) => item !== null);
    myRefs.current.forEach((elem) => elem.classList.remove('char__item_selected'));
    selectedElem.classList.add('char__item_selected');
    selectedElem.focus();
  };

  const onCharSelected = (id, selectedElem, myRefs) => {
    setChar(id);
    onFocusChar(selectedElem, myRefs);
  };
  return (
    <>
      <ErrorBoundary>
        <RandomChar />
      </ErrorBoundary>
      <div className='char__content'>
        <ErrorBoundary>
          <CharList onCharSelected={onCharSelected} />
        </ErrorBoundary>
        <div className='char__side-block'>
          <ErrorBoundary>
            <CharInfo charId={selectedChar} />
          </ErrorBoundary>
          <ErrorBoundary>
            <CharSearchForm />
          </ErrorBoundary>
        </div>
      </div>
      <img
        className='bg-decoration'
        src={decoration}
        alt='vision'
      />
    </>
  );
};

export default MainPage;
