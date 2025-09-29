import { Link, useMatch } from 'react-router-dom';
import clsx from 'clsx';
import css from './Logo.module.css';

const Logo = () => {
  const homePagePath = useMatch('/');
  const classNames = clsx(css.logo, !!homePagePath && css['is-inverted']);

  return (
    <Link to="/" className={classNames} viewTransition>
      foodies
    </Link>
  );
};

export default Logo;
