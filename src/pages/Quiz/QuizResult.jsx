import React, { useState, useEffect } from "react";
import "../Quiz/Quiz.scss";
import HomeButton from "../../components/HomeButton";
import { Button } from "../../components/Button";
import { Link } from "react-router-dom";
import bookBlank_edge from "../../../public/img/bookBlank_edge.png";
import axios from "axios";
import { BASE_URL } from "../../utils/URL";
import { formatDateIntoKorean } from "../../components/formatDateIntoKorean";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceSmileWink } from "@fortawesome/free-regular-svg-icons";
import { faFaceMeh } from "@fortawesome/free-regular-svg-icons";
import { faFaceTired } from "@fortawesome/free-regular-svg-icons";
// import { Risk } from "../../components/RiskFontAwesome";

export default function Quiz() {
  const numOfQuestions = 6;
  const linkHome = "/home";

  // 받아온 데이터
  const [quizResultData, setQuizResultData] = useState({
    // QnAList: [],
    correct_num: 0,
    wrong_num: 0,
    date: "",
  });

  // 위험도 포맷팅 to 스트링
  // let riskToString;
  // switch (quizResultData.risk) {
  //   case 0:
  //     riskToString = "안심";
  //     break;
  //   case 1:
  //     riskToString = "보통";
  //     break;
  //   case 2:
  //     riskToString = "위험";
  //     break;
  // }

  // 날짜 포맷팅 to Korean - 오늘 날짜
  let date = new Date();
  date.setDate(date.getDate());
  let today = date.toISOString().split("T")[0];
  today = formatDateIntoKorean(today);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/quiz/result`, {})
      .then((response) => {
        // const { QnAList, correct_num, wrong_num, risk, date } = response.data;
        const { correct_num, wrong_num, risk, date } = response.data;
        console.log(
          // `QnAlist: ${QnAList}, correct_num: ${correct_num}, wrong_num: ${wrong_num}, risk: ${risk}`
          `correct_num: ${correct_num}, wrong_num: ${wrong_num}, risk: ${risk}`
        );
        // setQuizResultData({ QnAList, correct_num, wrong_num, risk, date });
        setQuizResultData({ correct_num, wrong_num, risk, date });

        // 한국식 날짜로 바꿈
        const newFormattedDate = formatDateIntoKorean(date);
        setFormattedDate(newFormattedDate);
        console.log(`formattedDate: `, formattedDate);
      })
      .catch((error) => {
        console.error("Error: failed fetching the quiz result", error);
      });
  }, []);

  const QuizQuestion = () => {
    return (
      <div className="quiz-container quiz-question">
        <p>{`${today} 퀴즈 결과입니다. `}</p>
        <p>
          {`총 ${numOfQuestions} 문항 중 `}
          <span className="quiz-txt txt-primary">{`${quizResultData.correct_num} 문항`}</span>
          {`을 맞히셨습니다. `}
        </p>
        <p>
          {`현재 기억 건강 상태는 `}
          {quizResultData.risk === 0 ? (
            <span className="quiz-txt risk-low">
              {`안심`}
              {/* <Risk type="0" width="2.2rem" height="2.2rem" /> */}
              <FontAwesomeIcon icon={faFaceSmileWink} className="face-icon" />
            </span>
          ) : quizResultData.risk === 1 ? (
            <span className="quiz-txt risk-mid">
              {`보통`}
              <FontAwesomeIcon icon={faFaceMeh} className="face-icon" />
            </span>
          ) : (
            <span className="quiz-txt risk-high">
              {`위험`}
              <FontAwesomeIcon icon={faFaceTired} className="face-icon" />
            </span>
          )}
          {`입니다.`}
        </p>
      </div>
    );
  };

  const ReviewNote = () => {
    return (
      <div className="quiz-container1">
        <img
          src={bookBlank_edge}
          alt="bookBlank_edge"
          style={{ display: "inline-block", verticalAlign: "bottom" }}
        />

        <div className="quiz-container quiz-options">
          <div className="quiz-option">
            {/* List list(Question, answer, 정답, isCorrect) 형식 */}
            {/* {quizResultData.QnAlist.map((item, index) => (
              <p key={index}>{item}</p>
              item['Question']로도 접근 가능
            ))} */}
            item
          </div>
        </div>

        <img
          src={bookBlank_edge}
          alt="bookBlank_edge"
          style={{ transform: "scaleY(-1)" }}
        />
      </div>
    );
  };

  return (
    <>
      <HomeButton />
      <main className="quiz-page">
        <section className="quizresult-wrapper">
          <QuizQuestion />
          {/* <ReviewNote /> */}
          <Link to="/chart" className="button-container">
            <Button type={"primary"} width={"300px"} height={"50px"}>
              나의 기억 건강 보러 가기
            </Button>
          </Link>
        </section>
      </main>
    </>
  );
}
