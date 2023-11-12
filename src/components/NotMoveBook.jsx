import React, { useState } from "react";
import "./FlipBook.scss";

export const NotMoveBook = ({ left, right, mid }) => {
  const [currentPage, setCurrentPage] = useState(1);

  // const handlePageChange = (page) => {
  //   setCurrentPage(page);
  // };

  return (
    <div className="cover">
      <div className="book">
        {/* 왼쪽 보이는 페이지 */}
        <label
          htmlFor="page-1"
          className={`book__page book__page--1 ${
            currentPage === 1 ? "active" : ""
          }`}
        >
          {left}
        </label>

        {/* 오른쪽 보이는 페이지 */}
        <label
          htmlFor="page-2"
          className={`book__page book__page--4 ${
            currentPage === 2 ? "active" : ""
          }`}
        >
          {right}
        </label>

        {/* <input
          type="radio"
          name="page"
          id="page-1"
          checked={currentPage === 1}
        />
        <input
          type="radio"
          name="page"
          id="page-2"
          checked={currentPage === 2}
        /> */}

        {/* 움직이는 페이지 */}
        <label
          htmlFor="page-2"
          className={`book__page book__page--2 ${
            currentPage === 2 ? "active" : ""
          }`}
        >
          {mid}
        </label>
      </div>
    </div>
  );
};
