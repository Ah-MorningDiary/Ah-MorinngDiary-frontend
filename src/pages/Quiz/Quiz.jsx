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
  const [quizData, setQuizData] = useState({
    type: "",
    question: "",
    options: [],
  });
  const [numOfGet, setNumOfGet] = useState(0);

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
    setIsSubmitted(false); // 뒤로 돌아갈 때 제출 여부 초기화
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    navigate(linkQuizResult);
  };

  const handleForward = () => {
    if (questionNum < numOfQuestions) {
      setQuestionNum(questionNum + 1);
      setIsSubmitted(false); // 다음 문제로 넘어갈 때 제출 여부 초기화
    }

    setAnswerList((prevOptions) => [
      ...prevOptions,
      { num: questionNum, answer: selectedOption },
    ]);
  };

  const paramsToGetQuiz = {
    num: questionNum,
  };

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
  }, [questionNum, isSubmitted]);

  const paramsToSubmit = {
    answerList: answerList,
  };

  useEffect(() => {
    if (isSubmitted) {
      axios
        .post(`${BASE_URL}/quiz/submit`, paramsToSubmit)
        .then((response) => {
          console.log("Submitted successfully");
        })
        .catch((error) => {
          console.error("Error: failed submitting the answer", error);
        });
    }
  }, [isSubmitted]);

  const isImageQuestion = (question) => {
    const imageExtensions = ["png", "jpg", "jpeg", "gif"];
    const extension = question.split(".").pop().toLowerCase();
    return imageExtensions.includes(extension);
  };

  return (
    <>
      <HomeButton />

      <main className="quiz-page">
        <section className="quiz-wrapper">
          <div className="quiz-container quiz-question">
            {quizData.question ? (
              isImageQuestion(quizData.question) ? (
                <img
                  src={quizData.question}
                  alt={`Question ${questionNum}`}
                  className="question-img"
                />
              ) : (
                <p>{`${questionNum}. ${numOfGet}. ${quizData.question}`}</p>
              )
            ) : (
              <p>문제를 가져오는 중입니다...</p>
            )}
          </div>

          <div className="quiz-container1">
            <img
              src={bookBlank_edge}
              alt="bookBlank_edge"
              style={{ display: "inline-block", verticalAlign: "bottom" }}
            />
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
