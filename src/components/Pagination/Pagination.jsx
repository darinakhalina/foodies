import ReactPaginate from 'react-paginate';
import css from './Pagination.module.css';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <ReactPaginate
      forcePage={currentPage - 1}
      pageCount={totalPages}
      onPageChange={({ selected }) => {
        onPageChange(selected + 1);
      }}
      previousLabel={null}
      nextLabel={null}
      marginPagesDisplayed={1}
      pageRangeDisplayed={2}
      breakLabel={
        <svg className={css.icon}>
          <use href="/images/icons.svg#icon-dots" />
        </svg>
      }
      containerClassName={css.list}
      pageLinkClassName={css['list-item-link']}
      activeClassName={css['list-item-active']}
      breakClassName={css['list-item-break']}
    />
  );
};

export default Pagination;
