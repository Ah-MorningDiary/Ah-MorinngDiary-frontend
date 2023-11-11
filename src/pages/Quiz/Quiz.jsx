import React, { useState, useEffect } from "react";
import "./Quiz.scss";
import HomeButton from "../../components/HomeButton";
import { Button } from "../../components/Button";
import { useNavigate, Link } from "react-router-dom";
import bookBlank_edge from "../../../public/img/bookBlank_edge.png";
import axios from "axios";
import { BASE_URL } from "../../utils/URL";

export default function Quiz() {
  const linkHome = "/home";
  const [selectedOption, setSelectedOption] = useState("");
  const [questionNum, setQuestionNum] = useState(1);

  const handleOptionChange = (event) => {
    event.preventDefault();
    setSelectedOption(event.target.value);
    console.log("You have selected: ", selectedOption);
    // 응답 처리. 선택한 답을 저장 (다시 돌아오면 고칠 수 있도록)
  };

  const handleOptionSave = () => {
    console.log("Saved what you have chosen");
  };

  const handleBackward = () => {
    console.log("Moved backward");
    setQuestionNum(questionNum - 1);
    // 돌아오면 다시 마운트되는데.. 다시 랜덤으로 질문 받아오나?
  };

  const handleSubmit = () => {
    console.log("Submitted uccessfully");
    // 제출 후 로직 짜기
    // 결과 페이지로 넘어가게
  };

  const handleForward = () => {
    if (questionNum < 10) {
      setQuestionNum(questionNum + 1);
    }
  };

  // date는 'YYYY-MM-DD' 형식으로 변환해줌
  let date = new Date();
  date.setDate(date.getDate() - 1);
  const dateYesterday = date.toISOString().split("T")[0];
  const params = {
    date: dateYesterday,
    num: questionNum,
  };

  // 받아온 데이터
  const [quizData, setQuizData] = useState({
    Q_num: 1,
    Question: "",
    Answer: [],
  });

  useEffect(() => {
    console.log(`Question Number: ${questionNum}`);

    axios
      .get(`${BASE_URL}/quiz`, { params })
      .then((response) => {
        const { Q_num, Question, Answer } = response.data;
        console.log(
          `Q_num: ${Q_num}, Question: ${Question}, Answer: ${Answer}`
        );
        setQuizData({ Q_num, Question, Answer });
      })
      .catch((error) => {
        console.error("Error: failed fetching the quiz", error);
      });
  }, [questionNum]);

  return (
    <>
      <HomeButton />

      <main className="quiz-page">
        <section className="quiz-wrapper">
          <div className="quiz-container quiz-question">
            <p>
              1. I am문제에요
              {/* {`${quizData.Q_num}. ${quizData.Question}`} */}
            </p>
          </div>

          <div className="quiz-container1">
            <img
              src={bookBlank_edge}
              alt="bookBlank_edge"
              style={{ display: "inline-block", verticalAlign: "bottom" }}
            />

            <div className="quiz-container quiz-options">
              <form className="options-container" onSubmit={handleOptionSave}>
                {/* {quizData.Answer.map((answer, index) => (
                  <label key={index} className="options-item">
                    <input
                      type="radio"
                      name="option"
                      value={`option${index}`}
                      style={{ transform: 'scale(1.8)' }}
                      checked={selectedOption === `option${index}`}
                      onChange={handleOptionChange}
                    />
                    <p>{answer}</p>
                  </label>
                ))} */}

                <label className="options-item">
                  <input
                    type="radio"
                    name="option"
                    value="option1"
                    style={{ transform: "scale(1.8)" }}
                    checked={selectedOption === "option1"}
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
                  </p>
                </label>
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
            width={"160px"}
            height={"50px"}
            onClick={handleBackward}
            disabled={questionNum === 1}
          >
            이전
          </Button>

          {questionNum === 10 ? (
            <Button
              type={"primary"}
              width={"160px"}
              height={"50px"}
              onClick={handleSubmit}
            >
              제출
            </Button>
          ) : (
            <Button
              type={"primary"}
              width={"160px"}
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
