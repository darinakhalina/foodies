import { Link } from 'react-router-dom';

import css from './PathInfo.module.css';

const PathInfo = ({ pages }) => {
  return (
    <nav className={css['path-holder']}>
      <ul className={css['path-list']}>
        {pages.map((page, index) => (
          <li key={page.path}>
            {index !== 0 && <span className={css['path-separator']}>/</span>}
            {index < pages.length - 1 ? (
              <Link to={page.path} className={css['path-link']} viewTransition>
                {page.name}
              </Link>
            ) : (
              <span className={css['path-current']}>{page.name}</span>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default PathInfo;
