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

  const handleOptionChange = (event) => {
    event.preventDefault();
    setSelectedOption(parseInt(event.target.value));

    console.log(
      "You have selected option No. ",
      selectedOption,
      "on question No. ",
      questionNum
    );

    // 다시 돌아오면 고칠 수 있도록
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

  return (
    <>
      <HomeButton />

      <main className="quiz-page">
        <section className="quiz-wrapper">
          <div className="quiz-container quiz-question">
            <p>{`${questionNum}. ${numOfGet}. ${quizData.question}`}</p>
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
                      value={index}
                      checked={selectedOption === index}
                      style={{ transform: "scale(1.8)" }}
                      onChange={handleOptionChange}
                    />
                    <p>{option}</p>
                  </label>
                ))}

                {/* 테스트용 */}
                {/* <label className="options-item">
                  <input
                    type="radio"
                    name="option"
                    value="1"
                    checked={selectedOption === 1}
                    style={{ transform: "scale(1.8)" }}
                    // onChange={(event) => handleOptionChange(event, questionNum)}
                    onChange={handleOptionChange}
                  />
                  <p>
                    I'm a mess, mess, mess, mess, mess, mess, mess I'm a mess,
                    mess, mess, mess, mess, mess, mess I'm a mess in distress
                    But we're still the best dressed Fearless, say yes, we don't
                    dress to impress 괜찮단다 뭘 해도 거짓말인 걸 난 알아
                    괜찮겠지 뭘 해도 착한 얼굴에 니 말 잘 들을 땐 괜찮지 않아
                    그런 건 내 룰은 나만 정할래 yeah 볼 거야 금지된 걸 Never
                    hold back 더 자유롭게
                    Boom, boom, boom 내 심장이 뛰네
                  </p>
                </label> */}
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
