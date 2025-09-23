import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchTest } from '../../redux/test/operations';
import { selectPosts, selectLoading, selectError } from '../../redux/test/selectors';
import css from './HomePage.module.css';

const HomePage = () => {
  const dispatch = useDispatch();
  const posts = useSelector(selectPosts);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchTest());
  }, [dispatch]);

  return (
    <div className={css.wrapper}>
      <h1>Posts test demo</h1>

      {loading && <p>Loading…</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      {!loading && !error && (
        <ul>
          {posts.map(post => (
            <li key={post.id}>
              <p>
                <strong>{post.title}</strong>
              </p>
              <p>{post.body}</p>
              <Link to={`/${post.id}`}>Open {post.id}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default HomePage;
