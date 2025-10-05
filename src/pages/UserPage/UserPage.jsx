import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';

import Subtitle from '../../components/Subtitle/Subtitle.jsx';
import PathInfo from '../../components/PathInfo/PathInfo.jsx';

import styles from './UserPage.module.css';
import UserInfo from './components/UserInfo';
import TabBar from './components/TabBar';

const selectUserId = state => state.auth?.user?.id;
const selectIsLoggedIn = state => state.auth?.isLoggedIn;

// ------- Temporary mocked data for the panel -------
const MOCK_USER = {
  id: 'u1',
  name: 'Victoria',
  email: 'victoria@example.com',
  avatar: '/images/test-cat.png',
  stats: { recipes: 12, favorites: 8, followers: 221, following: 97 },
};
// -----------------------------------------------------

const TABS_OWN = ['MY RECIPES', 'MY FAVORITES', 'FOLLOWERS', 'FOLLOWING'];
const TABS_OTHER = ['RECIPES', 'FOLLOWERS'];

export default function UserPage() {
  const { id: routeId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const authUserId = useSelector(selectUserId);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  // determines if this profile belongs to the logged-in user
  const isOwnProfile =
    (routeId === 'me' && isLoggedIn) || (!!authUserId && String(authUserId) === String(routeId));

  const tabs = isOwnProfile ? TABS_OWN : TABS_OTHER;

  const activeTab = useMemo(() => {
    const p = location.pathname;
    if (p.includes('/recipes')) return isOwnProfile ? 'MY RECIPES' : 'RECIPES';
    if (p.includes('/favorites')) return 'MY FAVORITES';
    if (p.includes('/followers')) return 'FOLLOWERS';
    if (p.includes('/following')) return 'FOLLOWING';
    return isOwnProfile ? 'MY RECIPES' : 'RECIPES';
  }, [location.pathname, isOwnProfile]);

  const handleTabClick = tab => {
    const userIdForUrl = isOwnProfile ? (routeId === 'me' ? 'me' : authUserId) : routeId;
    switch (tab) {
      case 'MY RECIPES':
      case 'RECIPES':
        navigate(`/user/${userIdForUrl}/recipes`);
        break;
      case 'MY FAVORITES':
        navigate(`/user/${userIdForUrl}/favorites`);
        break;
      case 'FOLLOWERS':
        navigate(`/user/${userIdForUrl}/followers`);
        break;
      case 'FOLLOWING':
        navigate(`/user/${userIdForUrl}/following`);
        break;
      default:
        navigate(`/user/${userIdForUrl}/recipes`);
    }
  };

  // blocking other users private tabs
  useEffect(() => {
    if (!isOwnProfile) {
      if (location.pathname.includes('/favorites') || location.pathname.includes('/following')) {
        navigate(`/user/${routeId}/recipes`, { replace: true });
      }
    }
  }, [isOwnProfile, location.pathname, navigate, routeId]);

  return (
    <section className={`f-container ${styles.page}`}>
      <header className={styles.header}>
        <Subtitle tag="h1">PROFILE</Subtitle>

        <PathInfo
          pages={[
            { name: 'Home', path: '/' },
            { name: 'Profile', path: `/user/${routeId}` },
          ]}
        />

        <p className={styles.subtitle}>
          Reveal your culinary art, share your favorite recipe and create gastronomic masterpieces
          with us.
        </p>
      </header>

      <div className={styles.layout}>
        <UserInfo user={MOCK_USER} isOwnProfile={isOwnProfile} />

        <main className={styles.main}>
          <TabBar tabs={tabs} activeTab={activeTab} onTabClick={handleTabClick} />
          <Outlet />
        </main>
      </div>
    </section>
  );
}
