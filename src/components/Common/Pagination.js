import React from 'react';
import '../../styles/Pagination.css';

const Pagination = ({ currentPage, setPage, totalItems, itemsPerPage }) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const handlePageChange = (page) => {
        if (page > 0 && page <= totalPages) {
            setPage(page);
        }
    };

    return (
        <div className="pagination">
            <button onClick={() => handlePageChange(currentPage - 1)}>Previous</button>
            {[...Array(totalPages)].map((_, index) => (
                <button
                    key={index}
                    className={currentPage === index + 1 ? 'active' : ''}
                    onClick={() => handlePageChange(index + 1)}
                >
                    {index + 1}
                </button>
            ))}
            <button onClick={() => handlePageChange(currentPage + 1)}>Next</button>
        </div>
    );
};

export default Pagination;
