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

const Reading = () => {
  const [dates, setDates] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [diaryData, setDiaryData] = useState({
    writeDate: "2023-11-11",
    context: "화이팅!!!!!!",
    imgUrl: "image.png",
    whether: "SUNNY",
  });

  useEffect(() => {
    // 현재 날짜를 기준으로 일주일치 날짜 계산
    const days = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(currentDate);
      date.setDate(currentDate.getDate() + i - currentDate.getDay()); //일요일부터 토요일까지

      const nextDay = new Date(date);
      nextDay.setDate(nextDay.getDate() + 1); // Add one day
      days.push({
        dayFull: nextDay.toISOString().split("T")[0],
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
        <h2>{diaryData.title}</h2>
        <p>{diaryData.content}</p>
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

      <div className="Reading-wrapper">
        <div className="Reading-container">
          {/* diaryData가 있을 때만 일기를 표시 */}
          {diaryData && renderDiaryContent(diaryData)}
        </div>
      </div>
    </>
  );
};

export default Reading;
