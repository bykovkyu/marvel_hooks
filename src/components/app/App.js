import { useState } from 'react';
import AppHeader from '../appHeader/AppHeader';
import RandomChar from '../randomChar/RandomChar';
import CharList from '../charList/CharList';
import CharInfo from '../charInfo/CharInfo';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';
import AppBanner from '../appBanner/AppBanner';
import ComicsList from '../comicsList/ComicsList';
import SingleComic from '../singleComic/SingleComic';

import decoration from '../../resources/img/vision.png';

const App = () => {
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
    <div className='app'>
      <AppHeader />
      <main>
        {/* <ErrorBoundary>
          <RandomChar />
        </ErrorBoundary>
        <div className='char__content'>
          <ErrorBoundary>
            <CharList onCharSelected={onCharSelected} />
          </ErrorBoundary>
          <ErrorBoundary>
            <CharInfo charId={selectedChar} />
          </ErrorBoundary>
        </div>
        <img
          className='bg-decoration'
          src={decoration}
          alt='vision'
        /> */}
        <AppBanner />
        <ComicsList />
        {/* <SingleComic comicId={23348} /> */}
      </main>
    </div>
  );
};

export default App;
