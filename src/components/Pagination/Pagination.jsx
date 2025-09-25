import ReactPaginate from 'react-paginate';
import css from './Pagination.module.css';
import clsx from 'clsx';

const Pagination = ({ currentPage, totalPages, onPageChange, isDisabled }) => {
  return (
    <ReactPaginate
      forcePage={currentPage - 1}
      pageCount={totalPages}
      onPageChange={({ selected }) => {
        if (!isDisabled) {
          onPageChange(selected + 1);
        }
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
      containerClassName={clsx(css.list, { [css.disabled]: isDisabled })}
      pageLinkClassName={css['list-item-link']}
      activeClassName={css['list-item-active']}
      breakClassName={css['list-item-break']}
    />
  );
};

export default Pagination;
