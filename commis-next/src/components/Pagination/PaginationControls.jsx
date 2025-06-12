import { BiFirstPage, BiLastPage } from "react-icons/bi";
import styles from './styles/PaginationControls.module.css';

const PaginationControls = ({ currentPage, totalPages, onPageChange }) => {
    if (totalPages <= 1) return null;

    return (
        <div className={styles.paginationControls}>
            <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
                <BiFirstPage />
            </button>
            <span>{currentPage} / {totalPages}</span>
            <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                <BiLastPage />
            </button>
        </div>
    );
};

export default PaginationControls;
