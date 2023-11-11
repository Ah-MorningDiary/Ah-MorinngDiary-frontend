import React, { useEffect, useState, useRef } from "react";
import { Button, ButtonGroup } from "../../components/Button";
import "./Writing.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophone } from "@fortawesome/free-solid-svg-icons";
import useSpeechToText from "react-hook-speech-to-text";
import axios from "axios";
import { BASE_URL, IMAGE_API } from "../../utils/URL";
import { motion, useScroll } from "framer-motion";
import HomeButton from "../../components/HomeButton";
import Resizer from "react-image-file-resizer";

export default function Writing() {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [text, setText] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [imageURL, setImageURL] = useState("");

  const handleImageUpload = (imageData) => {
    setUploadedImage(imageData);
  };

  const [data, setData] = useState({
    context: "",
    imgUrl: "",
    weather: "",
  });

  const handleWeatherChange = (newWeather) => {
    setData({
      ...data,
      weather: newWeather,
    });
  };

  useEffect(() => {
    console.log(data);
  }, [data]);

  const fileInput = useRef([]);

  const onImageUpload = (event) => {
    fetch(IMAGE_API)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        const form = new FormData();
        form.append("file", event.target.files[0]);
        console.log(imageURL);

        fetch(result.url, {
          method: "POST",
          body: form,
        })
          .then((res) => res.json())
          .then((result) => {
            setImageURL(result.result.variants[0]);
          });
      });
  };

  const handleClickErase = () => {
    setText((prevText) => prevText.slice(0, -1));
  };

  const { error, interimResult, results, startSpeechToText, stopSpeechToText } =
    useSpeechToText({
      continuous: true,
      useLegacyResults: false,
    });

  useEffect(() => {
    setText(results.map((result) => result.transcript).join(""));
  }, [results]);

  const handleMicButtonClick = () => {
    setIsRecording(!isRecording);

    if (isRecording) {
      stopSpeechToText();
    } else {
      startSpeechToText();
    }
  };

  const handleClickSave = () => {
    // setData({
    //   ...data,
    //   context: text,
    // });

    console.log("Save Data:", data);

    // 여기서 서버로 데이터 전송하는 코드 추가
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

  return (
    <>
      <HomeButton />
      <div className="Writing-wrapper">
        <div className="Writing-container">
          <div className="Writing-item Writing-text">
            <div>
              <input type="file" id="file" onChange={onImageUpload} />
              {imageURL && (
                <img
                  src={imageURL}
                  alt="Preview"
                  width={"200px"}
                  height={"200px"}
                />
              )}
            </div>

            {/* 여기에 text 넣어서 음성 녹음 저장 연결하기 */}
            {text}
            <text className="Writing-text"></text>
          </div>

          <div className="Writing-btns">
            <Button
              type={"btn-mic"}
              className={`btn-mic ${isRecording ? "active" : ""}`}
              onClick={handleMicButtonClick}
            >
              {isRecording ? "stop" : "Start"}
            </Button>

            <Button type={"btn-gallery"}></Button>
          </div>

          <div className="btn-items btn-group">
            <Button
              type="primary"
              style={{ fontSize: "1.3rem", width: "100%", height: "50px" }}
              onClick={handleClickSave}
            >
              저장하기
            </Button>

            <div className="btn-group">
              <button
                className="weather-btn sunny"
                onClick={() => handleWeatherChange("SUNNY")}
                alt="SUNNY"
              />
              <button
                className="weather-btn cloudy"
                onClick={() => handleWeatherChange("CLODY")}
                alt="cloudy"
              />
              <button
                className="weather-btn rainy"
                onClick={() => handleWeatherChange("RAINING")}
                alt="rainy"
              />
              <button
                className="weather-btn snow"
                onClick={() => handleWeatherChange("SNOWING")}
                alt="snow"
              />
            </div>

            <Button
              type="secondary"
              style={{ fontSize: "1.3rem", width: "100%", height: "50px" }}
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
