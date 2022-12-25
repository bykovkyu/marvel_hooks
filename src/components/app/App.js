import { Component } from 'react';
import AppHeader from '../appHeader/AppHeader';
import RandomChar from '../randomChar/RandomChar';
import CharList from '../charList/CharList';
import CharInfo from '../charInfo/CharInfo';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';

import decoration from '../../resources/img/vision.png';

class App extends Component {
  state = {
    selectedChar: null,
  };

  onFocusChar = (selectedElem, myRefs) => {
    myRefs = myRefs.filter((item) => item !== null);
    myRefs.forEach((elem) => elem.classList.remove('char__item_selected'));
    selectedElem.classList.add('char__item_selected');
    selectedElem.focus();
  };

  onCharSelected = (id, selectedElem, myRefs) => {
    this.setState({ selectedChar: id });
    this.onFocusChar(selectedElem, myRefs);
  };

  render() {
    return (
      <div className='app'>
        <AppHeader />
        <main>
          <ErrorBoundary>
            <RandomChar />
          </ErrorBoundary>
          <div className='char__content'>
            <ErrorBoundary>
              <CharList onCharSelected={this.onCharSelected} />
            </ErrorBoundary>
            <ErrorBoundary>
              <CharInfo charId={this.state.selectedChar} />
            </ErrorBoundary>
          </div>
          <img
            className='bg-decoration'
            src={decoration}
            alt='vision'
          />
        </main>
      </div>
    );
  }
}

export default App;
