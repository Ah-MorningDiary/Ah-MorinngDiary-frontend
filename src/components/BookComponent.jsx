import React, { useState } from "react";
import { motion, useAnimation } from "framer-motion";

const BookComponent = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const controls = useAnimation();

  const nextPage = () => {
    controls.start({ x: "100%", opacity: 0 }); // 페이지를 오른쪽으로 이동하면서 투명도를 줄임
    setTimeout(() => {
      setCurrentPage((prev) => prev + 1);
      controls.start({ x: 0, opacity: 1 }); // 새로운 페이지를 왼쪽에서 들어오면서 투명도를 증가시킴
    }, 500); // 적절한 시간 간격
  };

  const prevPage = () => {
    controls.start({ x: "-100%", opacity: 0 }); // 페이지를 왼쪽으로 이동하면서 투명도를 줄임
    setTimeout(() => {
      setCurrentPage((prev) => prev - 1);
      controls.start({ x: 0, opacity: 1 }); // 새로운 페이지를 오른쪽에서 들어오면서 투명도를 증가시킴
    }, 500); // 적절한 시간 간격
  };

  return (
    <div>
      <motion.div
        animate={controls}
        style={{
          width: "100%",
          height: "400px",
          background: "lightblue",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <motion.div
          style={{
            width: "200%",
            height: "100%",
            display: "flex",
            transformOrigin: "0 0",
          }}
        >
          {/* 현재 페이지 */}
          <motion.div
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <h1>{`Page ${currentPage}`}</h1>
          </motion.div>

          {/* 다음 페이지 */}
          <motion.div
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <h1>{`Page ${currentPage + 1}`}</h1>
          </motion.div>
        </motion.div>
      </motion.div>

      <button onClick={prevPage}>이전 페이지</button>
      <button onClick={nextPage}>다음 페이지</button>
    </div>
  );
};

export default BookComponent;
