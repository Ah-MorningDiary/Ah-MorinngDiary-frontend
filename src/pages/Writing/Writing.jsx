import React, { useEffect, useState } from "react";
import { Button, ButtonGroup, ButtonUploader } from "../../components/Button";
import "./Writing.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophone } from "@fortawesome/free-solid-svg-icons";
import ImageUploader from "../../components/ImageUploader";
import useSpeechToText from "react-hook-speech-to-text";
import axios from "axios";
import { BASE_URL, BASE_URL_FRONT, BASE_STT_URL } from "../../utils/URL";
import { motion, useScroll } from "framer-motion";
import HomeButton from "../../components/HomeButton";
import WeatherButton from "../../components/WeatherButton";

export default function Writing() {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [text, setText] = useState();
  const [dummyText, setDummyText] =
    useState(`Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, veniam esse nisi ipsam illum minima sequi aut est animi commodi enim natus unde mollitia. Suscipit, mollitia ab? Ab, voluptate deserunt.
  Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, veniam esse nisi ipsam illum minima sequi aut est animi commodi enim natus unde mollitia. Suscipit, mollitia ab? Ab, voluptate deserunt.
  Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, veniam esse nisi ipsam illum minima sequi aut est animi commodi enim natus unde mollitia. Suscipit, mollitia ab? Ab, voluptate deserunt.
  Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, veniam esse nisi ipsam illum minima sequi aut est animi commodi enim natus unde mollitia. Suscipit, mollitia ab? Ab, voluptate deserunt.
  Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, veniam esse nisi ipsam illum minima sequi aut est animi commodi enim natus unde mollitia. Suscipit, mollitia ab? Ab, voluptate deserunt.
  Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, veniam esse nisi ipsam illum minima sequi aut est animi commodi enim natus unde mollitia. Suscipit, mollitia ab? Ab, voluptate deserunt.
  Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, veniam esse nisi ipsam illum minima sequi aut est animi commodi enim natus unde mollitia. Suscipit, mollitia ab? Ab, voluptate deserunt.
  Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, veniam esse nisi ipsam illum minima sequi aut est animi commodi enim natus unde mollitia. Suscipit, mollitia ab? Ab, voluptate deserunt.
  `);

  const [isRecordings, setIsRecordings] = useState(false);
  const { scrollYProgress } = useScroll();

  const handleImageUpload = (imageData) => {
    setUploadedImage(imageData);
  };

  const [data, setData] = useState({
    context: "",
    imgUrl: "",
    whether: "SUNNY",
  });

  const handleWeatherChange = (newWeather) => {
    setData({
      ...data,
      whether: newWeather,
    });
    console.log(data);
  };

  const handleClickSave = () => {
    console.log(data);
    axios
      .post(`${BASE_URL}/dairy/create`, {
        data,
      })
      .then((response) => {
        console.log("서버 응답:", response.data);
      })
      .catch((error) => {
        console.error("서버 요청 중 오류 발생:", error);
      });
  };

  // 테스트를 위한 진짜 지우기
  // const handleClickErase = () => {
  //   console.log("지우기");

  //   axios
  //     .delete(`${BASE_URL}/dairy/delete/2023-11-10`)
  //     .then((res) => {
  //       console.log("서버 응답:", res.data);
  //     })
  //     .catch((err) => {
  //       console.error("서버 요청 중 오류 발생:", error);
  //     });
  // };

  const handleClickErase = () => {
    setText((prevText) => prevText.slice(0, -1));
    stopSpeechToText();
  };

  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  useEffect(() => {
    setText(results.map((result) => result.transcript).join(""));
  }, [results]);

  const handleMicButtonClick = () => {
    setIsRecordings(!isRecordings);
  };
  if (error) return <p>지원이 되지 않는 기종입니다.🤷‍</p>;

  return (
    <>
      <HomeButton />
      <div className="Writing-wrapper">
        <div className="Writing-container">
          <div className="Writing-item Writing-text">
            <div className="ButtonUploader">
              <div>
                <ImageUploader onImageUpload={handleImageUpload} />
                {uploadedImage && <div></div>}
              </div>
            </div>
            {/* 여기에 text 넣어서 음성 녹음 저장 연결하기 */}
            {text}
            <text className="Writing-text"></text>
          </div>
          <div className="Writing-btns">
            <Button
              type={"btn-mic"}
              className={`btn-mic ${isRecordings ? "active" : ""}`}
              onClick={() => {
                handleMicButtonClick();
                if (isRecording) {
                  stopSpeechToText();
                } else {
                  startSpeechToText();
                }
              }}
            >
              {isRecording ? "stop" : "Start"}
            </Button>

            <Button type={"btn-gallery"}></Button>
          </div>

          <div className="btn-items btn-group">
            <Button
              type="primary"
              style={{ fontSize: "1.5rem", width: "100%", height: "50px" }}
              onClick={handleClickSave}
            >
              저장하기
            </Button>
            <div className="btn-group">
              <img
                src="/img/sunny.png"
                style={{ width: "80px", height: "80px" }}
                onClick={() => handleWeatherChange("SUNNY")}
                alt="SUNNY"
              />
              <img
                src="/img/cloudy.png"
                style={{ width: "80px", height: "80px" }}
                onClick={() => handleWeatherChange("CLOUDY")}
                alt="Cloudy"
              />
              <img
                src="/img/rainy.png"
                style={{ width: "80px", height: "80px" }}
                onClick={() => handleWeatherChange("RAINING")}
                alt="RAINING"
              />
              <img
                src="/img/snow.png"
                style={{ width: "80px" }}
                onClick={() => handleWeatherChange("SNOWING")}
                alt="SNOWING"
              />
            </div>
            <Button
              type="secondary"
              style={{ fontSize: "1.5rem", width: "100%", height: "50px" }}
              onClick={handleClickErase}
            >
              지우기
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
