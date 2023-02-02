import AppBanner from '../appBanner/AppBanner';
import ComicsList from '../comicsList/ComicsList';
import { useOutlet, Outlet } from 'react-router-dom';

const ComicsPage = () => {
  const outlet = useOutlet();

  return (
    <>
      <AppBanner />
      {outlet ? <Outlet /> : <ComicsList />}
    </>
  );
};

export default ComicsPage;
