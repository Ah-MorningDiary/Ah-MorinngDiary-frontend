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
import { Button } from "../../components/Button";

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
  const [selectedDate, setSelectedDate] = useState(null);
  //일기 보기 더미데이터
  const [diaryData, setDiaryData] = useState({
    writeDate: "",
    context: "",
    imgUrl: "",
    whether: "", //CLOUDY SNOWING SUNNY RAINING
  });
  //일기 보기 더미데이터
  const [dummyData, setDummyData] = useState({
    writeDate: "2023-11-01",
    context:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe repellat odio provident ",
    imgUrl: "/img/bookBackground.png",
    whether: "RAINING", //CLOUDY SNOWING SUNNY RAINING
  });
  const [editingText, setEditingText] = useState("");
  const [editingImgUrl, setEditingImgUrl] = useState("");
  const [editingWhether, setEditingWhether] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 창 열림 여부 상태

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

  // 주간 캘린더
  const handleWeekClick = (direction) => {
    const increment = direction === "next" ? 7 : -7;
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + increment);
    setCurrentDate(newDate);
  };

  // 날짜 선택시
  const handleDateClick = async (dayFull) => {
    setSelectedDate(dayFull);
    console.log(selectedDate, "selectedDate");
    try {
      console.log(dayFull);
      const response = await axios.get(`${BASE_URL}/dairy/read/${dayFull}`);
      const data = response.data;
      setDiaryData({
        writeDate: data.date,
        context: data.context,
        imgUrl: data.imgUrl,
        whether: data.whether,
      });
      console.log(data, "data");
      return data;
    } catch (error) {
      setDiaryData({
        writeDate: "",
        context: "",
        imgUrl: "",
        whether: "",
      });
      console.error("서버에러", error);
      throw error;
    }
  };

  const handleEditClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  // 수정하기
  const handleSaveClick = async () => {
    try {
      console.log(selectedDate, "selectedDate");
      // 수정된 텍스트, imgUrl, whether를 서버로 전송
      await axios.put(`${BASE_URL}/dairy/update/${selectedDate}`, {
        context: editingText,
        imgUrl: editingImgUrl,
        whether: editingWhether,
      });
      // 수정이 성공하면 일기 데이터 업데이트
      setDiaryData((prevData) => ({
        ...prevData,
        context: editingText,
        imgUrl: editingImgUrl,
        whether: editingWhether,
      }));
      // 수정 완료 후 입력 필드 초기화
      setEditingText("");
      setEditingImgUrl("");
      setEditingWhether("");
    } catch (error) {
      console.error("서버에러", error);
    }
  };

  //삭제하기
  const handleEraseClick = async () => {
    try {
      const response = await axios.delete(
        `${BASE_URL}/dairy/delete/${selectedDate}`
      );
      console.log("Delete Response:", response.data);
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  const handleWeatherChange = (newWeather) => {
    setData({
      ...data,
      whether: newWeather,
    });
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
                <li
                  key={index}
                  onClick={() => handleDateClick(date.dayFull)}
                  className={selectedDate === date.dayFull ? "selected" : ""}
                >
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

      <div className="btn-groups-center ">
        <button
          className="Diary-editButton btn-primary"
          onClick={handleEditClick}
        >
          수정하기
        </button>

        <button
          className="Diary-editButton btn-secondary"
          onClick={handleEraseClick}
        >
          삭제하기
        </button>
      </div>

      <NotMoveBook
        left={
          <div className={`Diary-left Diary-page`}>
            <div className="bottom">
              <text className="Diary-text fl whether">
                {diaryData && whetherRendering(diaryData.whether)}
              </text>
              <text className="Diary-text fl text-center">
                {diaryData.writeDate}
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
          <div className={`Diary-right Diary-page fs-l`}>
            <text className="Diary-text">{diaryData && diaryData.context}</text>

            <div className="update-container"></div>
          </div>
        }
      />
      {/* 모달 창 */}
      {isModalOpen && (
        <div className="Modal">
          <div className="Modal-content">
            <label htmlFor="editingText">내용 수정하기</label>
            <textarea
              id="editingText"
              className="Diary-textarea"
              value={editingText}
              onChange={(e) => setEditingText(e.target.value)}
            />

            <label htmlFor="editingImgUrl">이미지 추가하기</label>
            <input
              id="editingImgUrl"
              type="text"
              value={editingImgUrl}
              onChange={(e) => setEditingImgUrl(e.target.value)}
            />

            <label htmlFor="editingWhether">날씨 수정하기</label>

            <div className="btn-groups-center">
              <button
                className="weather-btn sunny"
                onClick={() => setEditingWhether("SUNNY")}
                alt="SUNNY"
              />
              <button
                className="weather-btn cloudy"
                onClick={() => setEditingWhether("CLODY")}
                alt="cloudy"
              />
              <button
                className="weather-btn rainy"
                onClick={() => setEditingWhether("RAINING")}
                alt="rainy"
              />
              <button
                className="weather-btn snow"
                onClick={() => setEditingWhether("SNOWING")}
                alt="snow"
              />
            </div>

            <div className="btn-groups-center">
              <Button type="primary" onClick={handleSaveClick}>
                저장하기
              </Button>
              <Button type="secondary" onClick={handleModalClose}>
                닫기
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Reading;
