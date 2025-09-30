import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useMemo } from 'react';

import Subtitle from '../../components/Subtitle/Subtitle.jsx';
import PathInfo from '../../components/PathInfo/PathInfo.jsx';

import styles from './UserPage.module.css';
import UserInfo from './components/UserInfo';
import TabBar from './components/TabBar';

// ------- Temporary mocked data -------
const MOCK_USER = {
  id: 'u1',
  name: 'Victoria',
  email: 'victoria@example.com',
  avatar: '/images/avatar-cat.png',
  stats: { recipes: 12, favorites: 8, followers: 221, following: 97 },
};

// -------------------------------------

const TABS_OWN = ['MY RECIPES', 'MY FAVORITES', 'FOLLOWERS', 'FOLLOWING'];
const TABS_OTHER = ['RECIPES', 'FOLLOWERS', 'FOLLOWING'];


export default function UserPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  // For now: show "own profile" UI if id === "23"
  const isOwnProfile = id === '23';
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
    switch (tab) {
      case 'MY RECIPES':
      case 'RECIPES':
        navigate(`/user/${id}/recipes`);
        break;
      case 'MY FAVORITES':
        navigate(`/user/${id}/favorites`);
        break;
      case 'FOLLOWERS':
        navigate(`/user/${id}/followers`);
        break;
      case 'FOLLOWING':
        navigate(`/user/${id}/following`);
        break;
      default:
        navigate(`/user/${id}/recipes`);
    }
  };

  return (
    <section className={`f-container ${styles.page}`}>
      <header className={styles.header}>

        {/* Breadcrumb from main */}
        <PathInfo
          pages={[
            { name: 'Home', path: '/' },
            { name: 'Profile', path: `/user/${id}` },
          ]}
        />
        
        {/* Title from main */}
        <Subtitle tag="h1">PROFILE</Subtitle>

        <p className={styles.subtitle}>
          Reveal your culinary art, share your favorite recipe and create gastronomic masterpieces with us.
        </p>
      </header>

      <div className={styles.layout}>
        <aside className={styles.sidebar}>
          <UserInfo user={MOCK_USER} isOwnProfile={isOwnProfile} />
        </aside>

        <main className={styles.main}>
          <TabBar tabs={tabs} activeTab={activeTab} onTabClick={handleTabClick} />
          <Outlet />
        </main>
      </div>
    </section>
  );
}
