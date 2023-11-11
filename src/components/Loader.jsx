import "./Loader.scss";
import { motion } from "framer-motion";
import { Button } from "../components/Button";

export const Loader = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.6 }}
    >
      <div className="loader-container">
        <img src="/img/logo.png" className="imglogo" />
        <div className="bookshelf_wrapper">
          <ul className="books_list">
            <li className="book_item first"></li>
            <li className="book_item second"></li>
            <li className="book_item third"></li>
            <li className="book_item fourth"></li>
            <li className="book_item fifth"></li>
            <li className="book_item sixth"></li>
          </ul>
          <div className="shelf"></div>
        </div>
        {/* <span className="loader"></span> */}
        <text className="font">
          이 서비스는 가로모드에 최적화 되어있습니다.
        </text>
        <Button
          type="btn-start"
          width={"300px"}
          fontSize={"26px"}
          height={"50px"}
        >
          시작하기
        </Button>
      </div>
    </motion.div>
  );
};
