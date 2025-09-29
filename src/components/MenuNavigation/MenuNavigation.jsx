import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import css from './MenuNavigation.module.css';

export default function MenuNavigation({ onClick, isInverted = false, direction = 'row' }) {
  const buildClassName = ({ isActive }) =>
    clsx(css.link, isInverted && css['is-inverted'], isActive && css.active);

  return (
    <nav className={clsx(css.nav, css[`direction-${direction}`])}>
      <NavLink to="/" className={buildClassName} onClick={onClick} viewTransition>
        Home
      </NavLink>

      <NavLink to="/recipe/add" className={buildClassName} onClick={onClick} viewTransition>
        Add recipe
      </NavLink>
    </nav>
  );
}
