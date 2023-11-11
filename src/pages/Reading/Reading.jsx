import React, { useState, useEffect } from "react";
import "./Reading.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faCloud,
  faSnowflake,
  faSun,
  faCloudShowersHeavy,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { BASE_URL } from "../../utils/URL";
import HomeButton from "../../components/HomeButton";
import { NotMoveBook } from "../../components/NotMoveBook";
import { formatDate } from "../../components/formatDate";

const fetchDataFromServer = async (dayFull) => {
  try {
    // http://3.39.139.234:8080/dairy/read/2023-11-11
    console.log(dayFull);
    const response = await axios.get(`${BASE_URL}/dairy/read/${dayFull}`);
    const data = response.data;
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching data from the server", error);
    throw error;
  }
};
const whetherRendering = (whether) => {
  switch (whether) {
    case "CLOUDY":
      return <img src="/img/cloudy.png" style={{ width: "80px" }} />;
    case "SNOWING":
      return <img src="/img/snow.png" style={{ width: "80px" }} />;
    case "SUNNY":
      return <img src="/img/sunny.png" style={{ width: "80px" }} />;
    case "RAINING":
      return <img src="/img/rainy.png" style={{ width: "80px" }} />;
    default:
      return null; // or a default icon if needed
  }
};

const Reading = () => {
  const [dates, setDates] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  //일기 보기 더미데이터
  const [diaryData, setDiaryData] = useState({
    writeDate: "2023-11-01",
    context:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe repellat odio provident quo repellendus eum sint architecto reprehenderit ipsum, quia facilis magnam possimus doloremque sunt nam? Nisi laborum ad nihil!",
    imgUrl: "/img/bookBackground.png",
    whether: "RAINING", //CLOUDY SNOWING SUNNY RAINING
  });
  useEffect(() => {
    // 현재 날짜를 기준으로 일주일치 날짜 계산
    const days = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(currentDate);
      date.setDate(currentDate.getDate() + i - currentDate.getDay()); //일요일부터 토요일까지

      const nextDay = new Date(date);
      nextDay.setDate(nextDay.getDate() + 1);
      days.push({
        dayFull: date.toISOString().split("T")[0],
        dayOfMonth: date.getDate(),
        dayOfWeek: date.getDay(), // 0(일) ~ 6(토)
      });
    }

    setDates(days);
  }, [currentDate]);

  const handleWeekClick = (direction) => {
    const increment = direction === "next" ? 7 : -7;
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + increment);
    setCurrentDate(newDate);
  };

  const handleDateClick = async (dayFull) => {
    try {
      const data = await fetchDataFromServer(dayFull);
      setDiaryData(data);
    } catch (error) {
      console.error("Error fetching data for the selected date", error);
    }
  };

  const renderDiaryContent = (diaryData) => {
    return (
      <>
        <p>{diaryData.date}</p>
        <h2>{diaryData.title}</h2>
        <p>{diaryData.content}</p>
        <h2>{diaryData.imgUrl}</h2>
        {/* 추가적인 표시 로직 */}
      </>
    );
  };

  return (
    <>
      <HomeButton />
      <div className="Reading-Calendar">
        <FontAwesomeIcon
          icon={faChevronLeft}
          className="btn"
          onClick={() => handleWeekClick("prev")}
        />
        <div className="Reading-containers">
          <div className="Reading-line">
            <hr />
          </div>

          <ul className="Reading-day">
            <li className="day-Sun">일요일</li>
            <li className="day-Weekday">월요일</li>
            <li className="day-Weekday">화요일</li>
            <li className="day-Weekday">수요일</li>
            <li className="day-Weekday">목요일</li>
            <li className="day-Weekday">금요일</li>
            <li className="day-Sat">토요일</li>
          </ul>

          <div className="Reading-weekCalender">
            <ul className="Reading-date">
              {dates.map((date, index) => (
                <li key={index} onClick={() => handleDateClick(date.dayFull)}>
                  {date.dayOfMonth}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <FontAwesomeIcon
          icon={faChevronRight}
          className="btn"
          onClick={() => handleWeekClick("next")}
        />
      </div>

      <NotMoveBook
        left={
          <div className={`Diary-left Diary-page`}>
            <div className="bottom">
              <text className="Diary-text fl whether">
                {diaryData && whetherRendering(diaryData.whether)}
              </text>
              <text className="Diary-text fl">
                {diaryData && formatDate(diaryData.writeDate)}
              </text>
              {diaryData.imgUrl ? (
                <img className="img" src={diaryData.imgUrl} alt="Diary Image" />
              ) : (
                <img className="img" src="/img/logo.png" alt="Logo" />
              )}
            </div>
          </div>
        }
        // mid={
        //   <div className={`Diary-right Diary-page`}>
        //     <div className="bottom">
        //       <text className="Diary-text">
        //         {diaryData && diaryData.context}
        //       </text>
        //     </div>
        //   </div>
        // }
        right={
          <div className={`Diary-right Diary-page`}>
            <div className="bottom">
              <text className="Diary-text">
                {diaryData && diaryData.context}
              </text>
            </div>
          </div>
        }
      />
    </>
  );
};

export default Reading;
