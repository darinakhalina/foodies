import { useMatch } from 'react-router-dom';
import clsx from 'clsx';
import css from './Header.module.css';

const Header = () => {
  const homePagePath = useMatch('/');

  return (
    <header
      className={clsx(css['header-container'], 'f-container', homePagePath && css['is-inverted'])}
    >
      Header Content
    </header>
  );
};

export default Header;
