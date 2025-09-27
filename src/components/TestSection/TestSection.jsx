import { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectError, selectLoading, selectPosts } from '../../redux/test/selectors.js';
import { fetchTest } from '../../redux/test/operations.js';
import Modal from '../Modal/Modal';
import Button from '../Button/Button';
import css from './TestSection.module.css';

import Pagination from '../Pagination/Pagination';
import MenuSidePanel from '../MenuSidePanel/MenuSidePanel.jsx';

// test only, mock items used only for demo pagination
const items = Array.from({ length: 100 }, (_, i) => `Item ${i + 1}`);

const TestSection = () => {
  const dispatch = useDispatch();
  const posts = useSelector(selectPosts);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [open, setOpen] = useState(false);

  // fixed page size for demo, should be dynamic for real app
  const limit = 5;
  const totalPages = Math.ceil(items.length / limit);

  // test only, paginate mock items (only for demo UI)
  const pageItems = useMemo(() => {
    const start = (currentPage - 1) * limit;
    const end = start + limit;
    return items.slice(start, end);
  }, [currentPage]);

  useEffect(() => {
    dispatch(fetchTest());
  }, [dispatch]);

  // test only, handler for page change
  const handlePageChange = page => {
    console.log('cb: will get page from component', page);

    // for real data, pass page and other params to fetch function
    // dispatch(fetchSomeTest({ page, limit }));

    // test only, for real app replace with redux state
    setCurrentPage(page);
  };

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
      <div className="f-container">
        <Button size="sm" onClick={() => setIsModalOpen(!isModalOpen)}>
          Open Modal
        </Button>
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <div>Test Modal Content</div>
        </Modal>
      </div>

      <div className="f-container">
        <div>
          <h2>Demo Pagination</h2>

          <ul>
            {pageItems.map(item => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            isDisabled={false} // disable pagination while data is loading, pass isLoading for real app
          />
        </div>
      </div>
      <div>
        <button onClick={() => setOpen(true)}>Open Drawer</button>

        <MenuSidePanel isOpen={open} onClose={() => setOpen(false)}>
          <p>TEST</p>
        </MenuSidePanel>
      </div>
    </section>
  );
};

export default TestSection;
