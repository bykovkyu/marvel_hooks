import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { MainPage, ComicsPage } from '../pages'; // from '../pages' - ищет файл index.js

import AppHeader from '../appHeader/AppHeader';
// import MainPage from '../pages/MainPage';
// import ComicsPage from '../pages/ComicsPage';

const App = () => {
  return (
    <Router>
      <div className='app'>
        <AppHeader />
        <main>
          <Routes>
            <Route
              path='/'
              element={<MainPage />}
            />
            <Route
              path='/comics'
              element={<ComicsPage />}
            />
          </Routes>
          {/* <SingleComic comicId={23348} /> */}
        </main>
      </div>
    </Router>
  );
};

export default App;
