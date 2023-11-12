import React, { useState, useEffect } from "react";
import "./Quiz.scss";
import HomeButton from "../../components/HomeButton";
import { Button } from "../../components/Button";
import { useNavigate } from "react-router-dom";
import bookBlank_edge from "../../../public/img/bookBlank_edge.png";
import axios from "axios";
import { BASE_URL } from "../../utils/URL";

export default function Quiz() {
  const numOfQuestions = 6;
  const linkQuizResult = "/quiz/result";
  const navigate = useNavigate();
  const [questionNum, setQuestionNum] = useState(1);
  const [selectedOption, setSelectedOption] = useState(0);
  const [answerList, setAnswerList] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleOptionChange = (value) => {
    setSelectedOption(value);

    console.log(
      "You have selected option No. ",
      value,
      "on question No. ",
      questionNum
    );
  };

  const handleBackward = () => {
    console.log("Moved backward");
    setQuestionNum(questionNum - 1);
    // 돌아오면 다시 마운트되는데.. 다시 랜덤으로 질문 받아오나?
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    navigate(linkQuizResult);
  };

  const handleForward = () => {
    if (questionNum < numOfQuestions) {
      setQuestionNum(questionNum + 1);
    }

    // questionNum, 선택한 답을 배열에 저장 -> 나중에 POST 요청의 params로 전달
    setAnswerList((prevOptions) => [
      ...prevOptions,
      { num: questionNum, answer: selectedOption },
    ]);
  };

  // 퀴즈 받아오는 GET 요청
  // date는 'YYYY-MM-DD' 형식으로 변환
  // let date = new Date();
  // date.setDate(date.getDate());
  // const newDate = date.toISOString().split("T")[0];
  const paramsToGetQuiz = {
    // date: newDate,
    num: questionNum,
  };

  // 받아온 데이터
  const [quizData, setQuizData] = useState({
    type: "",
    question: "",
    options: [],
  });

  const [numOfGet, setNumOfGet] = useState(0); // GET 받아온 횟수

  useEffect(() => {
    console.log(`Question Number: ${questionNum}`);

    axios
      .get(`${BASE_URL}/quiz/${questionNum}`, { paramsToGetQuiz })
      .then((response) => {
        const { type, question, options } = response.data;
        console.log(
          `type: ${type}, question: ${question}, options: ${options}`
        );
        setQuizData({ type, question, options });
        setNumOfGet(numOfGet + 1);
      })
      .catch((error) => {
        console.error("Error: failed fetching the quiz", error);
      });
  }, [questionNum + 1]);

  // 제출 POST 요청
  const paramsToSubmit = {
    answerList: answerList,
  };

  useEffect(() => {
    axios
      .post(`${BASE_URL}/quiz/submit`, { paramsToSubmit })
      .then((response) => {
        console.log("Submitted uccessfully");
      })
      .catch((error) => {
        console.error("Error: failed submitting the answer", error);
      });
  }, [isSubmitted]);

  // 함수 추가
  const isImageQuestion = (question) => {
    const imageExtensions = ["png", "jpg", "jpeg", "gif"]; // 이미지로 처리할 확장자 목록

    // URL에서 확장자 추출
    const extension = question.split(".").pop().toLowerCase();

    // 이미지로 처리할 확장자인지 확인
    return imageExtensions.includes(extension);
  };

  return (
    <>
      <HomeButton />

      <main className="quiz-page">
        <section className="quiz-wrapper">
          <div className="quiz-container quiz-question">
            {isImageQuestion(quizData.question) ? (
              <img
                src={quizData.question}
                alt={`Question ${questionNum}`}
                className="question-img"
              />
            ) : (
              <p>{`${questionNum}. ${numOfGet}. ${quizData.question}`}</p>
            )}
          </div>

          <div className="quiz-container1">
            <img
              src={bookBlank_edge}
              alt="bookBlank_edge"
              style={{ display: "inline-block", verticalAlign: "bottom" }}
            />
            {/* 가져온 퀴즈 데이터 렌더링 */}
            <div className="quiz-container quiz-options">
              <form className="options-container">
                {quizData.options.map((option, index) => (
                  <label key={index} className="options-item">
                    <input
                      type="radio"
                      name="option"
                      value={index + 1}
                      checked={selectedOption === index + 1}
                      style={{ transform: "scale(1.8)" }}
                      onClick={() => handleOptionChange(index + 1)}
                    />
                    <p>{option}</p>
                  </label>
                ))}
              </form>
            </div>

            <img
              src={bookBlank_edge}
              alt="bookBlank_edge"
              style={{ transform: "scaleY(-1)" }}
            />
          </div>
        </section>

        <section className="button-container">
          <Button
            type={"secondary"}
            width={"200px"}
            height={"50px"}
            onClick={handleBackward}
            disabled={questionNum === 1}
          >
            이전
          </Button>

          {questionNum === numOfQuestions ? (
            <Button
              type={"primary"}
              width={"200px"}
              height={"50px"}
              onClick={handleSubmit}
            >
              제출
            </Button>
          ) : (
            <Button
              type={"primary"}
              width={"200px"}
              height={"50px"}
              onClick={handleForward}
            >
              다음
            </Button>
          )}
        </section>
      </main>
    </>
  );
}
