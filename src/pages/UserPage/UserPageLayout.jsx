import { useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import MyRecipes from './components/MyRecipes';
import MyFavorites from './components/MyFavorites';
import Followers from './components/Followers';
import Following from './components/Following';

const selectUserId = state => state.auth?.user?.id;
const selectIsLoggedIn = state => state.auth?.isLoggedIn;

export default function UserPageLayout() {
  const { id: routeId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const authUserId = useSelector(selectUserId);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const isOwnProfile =
    (routeId === 'me' && isLoggedIn) ||
    (!!authUserId && String(authUserId) === String(routeId));

  // guard private tabs on foreign profile
  useEffect(() => {
    if (!isOwnProfile) {
      if (location.pathname.includes('/favorites') || location.pathname.includes('/following')) {
        navigate(`/user/${routeId}/recipes`, { replace: true });
      }
    }
  }, [isOwnProfile, location.pathname, navigate, routeId]);

  // ---- OWN PROFILE ----
  if (isOwnProfile) {
    if (location.pathname.includes('/favorites')) return <MyFavorites />;
    if (location.pathname.includes('/followers')) return <Followers />;
    if (location.pathname.includes('/following')) return <Following />;
    return <MyRecipes />; // default
  }

  // ---- OTHER USER PROFILE ----
  if (location.pathname.includes('/followers')) return <Followers />;
  return <MyRecipes />;
}
