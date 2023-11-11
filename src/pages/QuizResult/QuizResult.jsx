import React, { useState, useEffect } from "react";
import "../Quiz/Quiz.scss";
import HomeButton from "../../components/HomeButton";
import { Button } from "../../components/Button";
import { useNavigate, Link } from "react-router-dom";
import bookBlank_edge from "../../../public/img/bookBlank_edge.png";
import axios from "axios";
import { BASE_URL } from "../../utils/URL";

export default function Quiz() {
  const linkHome = "/home";
  // const [selectedOption, setSelectedOption] = useState('');

  // 받아온 데이터
  const [quizResultData, setQuizResultData] = useState({
    list: [],
    correct_num: 0,
    wrong_num: 0,
    risk: 0,
  });

  useEffect(() => {
    axios
      .get(`${BASE_URL}/quiz/result`, {})
      .then((response) => {
        const { list, correct_num, wrong_num, risk } = response.data;
        console.log(
          `list: ${list}, correct_num: ${correct_num}, wrong_num: ${wrong_num}, risk: ${risk}`
        );
        setQuizData({ list, correct_num, wrong_num, risk });
      })
      .catch((error) => {
        console.error("Error: failed fetching the quiz result", error);
      });
  }, []);

  return (
    <>
      <HomeButton />

      <main className="quiz-page">
        <section className="quiz-wrapper">
          <div className="quiz-container1">
            <img
              src={bookBlank_edge}
              alt="bookBlank_edge"
              style={{ display: "inline-block", verticalAlign: "bottom" }}
            />

            <div className="quiz-container quiz-options">
              <p>
                {`총 10 문제 중 `}
                <span
                  style={{ fontSize: "2.4rem", fontWeight: "bold" }}
                >{`${quizResultData.correct_num} 문제`}</span>
                {`를 맞히셨습니다. `}
              </p>
            </div>
            <img
              src={bookBlank_edge}
              alt="bookBlank_edge"
              style={{ transform: "scaleY(-1)" }}
            />
          </div>

          <div className="quiz-container1">
            <img
              src={bookBlank_edge}
              alt="bookBlank_edge"
              style={{ display: "inline-block", verticalAlign: "bottom" }}
            />

            <div className="quiz-container quiz-options"></div>

            <img
              src={bookBlank_edge}
              alt="bookBlank_edge"
              style={{ transform: "scaleY(-1)" }}
            />
          </div>
        </section>
      </main>
    </>
  );
}
