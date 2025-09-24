import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchTestById } from '../../redux/test/operations';
import { selectCurrentPost, selectLoading, selectError } from '../../redux/test/selectors';

const TestPostPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const post = useSelector(selectCurrentPost);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchTestById(id));
  }, [dispatch, id]);

  if (loading) return <p>Loading…</p>;
  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;
  if (!post) return <p>Not found</p>;

  return (
    <>
      <div style={{ padding: 16 }}>
        <h1>Post #{post.id}</h1>
        <h2>{post.title}</h2>
        <p>{post.body}</p>
      </div>
      <p>
        <Link to="/">Back to HP</Link>
      </p>
    </>
  );
};

export default TestPostPage;
