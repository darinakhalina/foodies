import { useMatch } from 'react-router-dom';
import clsx from 'clsx';
import css from './Header.module.css';

const Header = () => {
  const homePagePath = useMatch('/');

  return (
    <header className={clsx(css['header-holder'], homePagePath && css['is-inverted'])}>
      <div className={clsx(css['header-container'], 'f-container')}>Header Content</div>
    </header>
  );
};

export default Header;
