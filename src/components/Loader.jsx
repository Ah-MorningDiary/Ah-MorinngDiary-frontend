import "./Loader.scss";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "../components/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const REST_API_KEY = import.meta.env.VITE_APP_REST_API_KEY;

export const Loader = () => {
  const REDIRECT_URI = "http://127.0.0.1:3000/kakao/callback";
  const KAKAO_AUTH_URI = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  const code = new URL(window.location.href).searchParams.get("code");
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`api/code=${code}`);
        const token = res.headers.authorization;
        window.localStorage.setItem("token", token);
        console.log("Token:", token);
        //navigate("/home");
      } catch (e) {
        console.error(e);
        //navigate("/home");
      }
    })();
  }, []);

  return (
    <div className="loader-background">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.6 }}
      >
        <div className="loader-container">
          <div className="logo-container">
            <img src="/img/logoNoBackground.png" className="imglogo" />
            <span className="font-title">앗!침에 일기</span>
          </div>
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

          <a href={KAKAO_AUTH_URI}>카카오로 시작하기</a>

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
    </div>
  );
};
