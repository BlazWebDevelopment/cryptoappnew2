import React from "react";
import "./style/pagination.css";

interface PaginationProps {
  totalPosts: number;
  postsPerPage: number;
  setCurrentPage: (page: number) => void;
  currentPage: number;
}

const Pagination: React.FC<PaginationProps> = ({
  totalPosts,
  postsPerPage,
  setCurrentPage,
  currentPage,
}) => {
  const pages = [];

  for (let i = 1; i <= totalPosts / postsPerPage; i++) {
    pages.push(i);
  }
  return (
    <>
      {totalPosts >= 8 && (
        <div className="pageBtns">
          <div className={currentPage === 1 ? "hidden1" : "left"}>
            <button
              className="prevPage"
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              Page {currentPage - 1}←
            </button>
          </div>

          <div className="middle">
            <button
              className="currentPage"
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              {currentPage}
            </button>
          </div>
          <div className="right">
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              className="nextBtn"
            >
              Page {currentPage + 1} →
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Pagination;
