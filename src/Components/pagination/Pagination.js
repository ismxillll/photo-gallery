import React, { useState, useEffect } from 'react';
import './Pagination.css';

const Pagination = ({ totalPages, onPageChange }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [displayedPages, setDisplayedPages] = useState([]);
  const itemsPerPage = 10;

  useEffect(() => {
    updateDisplayedPages();
  }, [currentPage, totalPages]);

  const updateDisplayedPages = () => {
    const maxPages = Math.min(totalPages, currentPage + itemsPerPage - 1);
    const newDisplayedPages
= [];
    for (let i = currentPage; i <= maxPages; i++) {
      newDisplayedPages.push(i);
    }
    setDisplayedPages(newDisplayedPages);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    onPageChange(page);
  };

  const renderPageNumbers = () => {
    return displayedPages.map((page) => (
      <li
        key={page}
        className={currentPage === page ? 'active' : ''}
        onClick={() => handlePageChange(page)}
      >
        {page}
      </li>
    ));
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - itemsPerPage);
    }
  };

  const goToNextPage = () => {
    if (currentPage + itemsPerPage - 1 < totalPages) {
      setCurrentPage(currentPage + itemsPerPage);
    }
  };

  return (
    <ul className="pagination">
      <li onClick={goToPreviousPage}>&laquo;</li>
      {renderPageNumbers()}
      <li onClick={goToNextPage}>&raquo;</li>
    </ul>
  );
};

export default Pagination;