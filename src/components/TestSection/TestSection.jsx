import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectError, selectLoading, selectPosts } from '../../redux/test/selectors.js';
import { fetchTest } from '../../redux/test/operations.js';
import css from './TestSection.module.css';

const TestSection = () => {
  const dispatch = useDispatch();
  const posts = useSelector(selectPosts);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchTest());
  }, [dispatch]);

  return (
    <section className={css.test}>
      <div className="f-container">
        <h1>Test Section</h1>

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
    </section>
  );
};

export default TestSection;
