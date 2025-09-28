import { useMatch } from 'react-router-dom';
import clsx from 'clsx';
import css from './Header.module.css';
import useMediaQuery from '../../hooks/useMediaQuery.js';
import MobileMenu from '../MobileMenu/MobileMenu.jsx';
import MenuNavigation from '../MenuNavigation/MenuNavigation.jsx';
import Logo from '../Logo/Logo.jsx';
import UserBar from '../UserBar/UserBar.jsx';

const Header = () => {
  const homePagePath = useMatch('/');
  const isMobile = useMediaQuery('(max-width: 767px)');

  return (
    <header className={clsx(css['header-holder'], !!homePagePath && css['is-inverted'])}>
      <div className={clsx(css['header-container'], 'f-container')}>
        <Logo />
        {!isMobile && <MenuNavigation isInverted={!!homePagePath} />}
        <div className={css['header-container-actions']}>
          <UserBar />
          {isMobile && <MobileMenu />}
        </div>
      </div>
    </header>
  );
};

export default Header;
