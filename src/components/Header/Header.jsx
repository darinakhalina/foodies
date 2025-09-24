import { useMatch } from 'react-router-dom';
import clsx from 'clsx';
import css from './Header.module.css';

const Header = () => {
  /* eslint-disable no-unused-vars */
  const user = null; // toDo: use real data from store
  const rootPath = useMatch('/'); // toDo: use constants
  const recipesPath = useMatch('/recipes'); // toDo: use constants
  /* eslint-enable no-unused-vars */

  return <header className={clsx(css['header-container'], 'f-container')}>Header Content</header>;
};

export default Header;
