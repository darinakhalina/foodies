import { useLocation, useParams } from 'react-router-dom';
import MyRecipes from './components/MyRecipes';
import MyFavorites from './components/MyFavorites';
import Followers from './components/Followers';
import Following from './components/Following';

export default function UserPageLayout() {
  const { id } = useParams();
  const location = useLocation();
  const isOwnProfile = id === 'me';

  if (location.pathname.includes('/recipes')) return <MyRecipes />;
  if (location.pathname.includes('/favorites') && isOwnProfile) return <MyFavorites />;
  if (location.pathname.includes('/followers')) return <Followers />;
  if (location.pathname.includes('/following') && isOwnProfile) return <Following />;

  return <MyRecipes />;
}
