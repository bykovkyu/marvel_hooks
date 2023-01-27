import AppBanner from '../appBanner/AppBanner';
import ComicsList from '../comicsList/ComicsList';
import { useOutlet, Outlet } from 'react-router-dom';

const ComicsPage = () => {
  const outlet = useOutlet();

  return outlet ? (
    <Outlet />
  ) : (
    <>
      <AppBanner />
      <ComicsList />
    </>
  );
};

export default ComicsPage;
