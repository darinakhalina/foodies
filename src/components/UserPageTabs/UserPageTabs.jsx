import Pagination from '../Pagination/Pagination';
import Loader from '../Loader/Loader';
import styles from './UserPageTabs.module.css';

export default function UserPageTabs({
    children,
    currentPage,
    totalPages,
    onPageChange,
    isLoading = false,
    isDisabled = false }) {
    return (
    <section className={styles.wrapper}>
    <div className={styles.listContainer}>
        {isLoading ? <Loader /> : children}
        </div>

        {
        totalPages > 1 && (
            <div className={styles.paginationContainer}>
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={onPageChange}
                    isDisabled={isDisabled || isLoading}
                />
            </div>
        )
    }
    </section>        
);
};