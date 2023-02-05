import { Helmet } from 'react-helmet';

import AppBanner from '../appBanner/AppBanner';
import ComicsList from '../comicsList/ComicsList';
import { useOutlet, Outlet } from 'react-router-dom';

const ComicsPage = () => {
  const outlet = useOutlet();

  return (
    <>
      <Helmet>
        <meta
          name='description'
          content='Page with list of our comics'
        />
        <title>Comics page</title>
      </Helmet>
      <AppBanner />
      {outlet ? <Outlet /> : <ComicsList />}
    </>
  );
};

export default ComicsPage;
