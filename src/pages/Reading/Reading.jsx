import React, { useState, useEffect } from "react";
import "./Reading.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { BASE_URL } from "../../utils/URL";
import HomeButton from "../../components/HomeButton";
import { NotMoveBook } from "../../components/NotMoveBook";
import { formatDateIntoKorean } from "../../components/formatDateIntoKorean";

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
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe repellat odio provident ",
    imgUrl: "/img/bookBackground.png",
    whether: "RAINING", //CLOUDY SNOWING SUNNY RAINING
  });

  useEffect(() => {
    // 현재 날짜를 기준으로 일주일치 날짜 계산
    const days = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(currentDate);
      date.setDate(currentDate.getDate() + i - currentDate.getDay());

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
      console.log(dayFull);
      const response = await axios.get(`${BASE_URL}/dairy/read/${dayFull}`);
      const data = response.data;
      setDiaryData({
        writeDate: data.Date,
        context: data.context,
        imgUrl: data.imgUrl,
        whether: data.whether,
      });
      return data;
    } catch (error) {
      console.error("서버에러", error);
      throw error;
    }
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
                {diaryData && formatDateIntoKorean(diaryData.writeDate)}
              </text>
              {diaryData.imgUrl ? (
                <img className="img" src={diaryData.imgUrl} alt="Diary Image" />
              ) : (
                <img className="img" src="/img/logo.png" alt="Logo" />
              )}
            </div>
          </div>
        }
        mid={
          <div className={`Diary-right Diary-page`}>
            <div className="bottom">
              <text className="Diary-text">
                {diaryData && diaryData.context}
              </text>
            </div>
          </div>
        }
        // right={
        //   <div className={`Diary-right Diary-page`}>
        //     <div className="bottom">
        //       <text className="Diary-text">
        //         {diaryData && diaryData.context}
        //       </text>
        //     </div>
        //   </div>
        // }
      />
    </>
  );
};

export default Reading;
