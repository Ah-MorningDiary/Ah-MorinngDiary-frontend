import React, { useState } from "react";

const WeatherButton = () => {
  const [data, setData] = useState({
    whether: "", // 기본값 설정 필요
  });

  const handleWeatherChange = (newWeather) => {
    setData({
      ...data,
      whether: newWeather,
    });
    console.log(data);
  };

  return (
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
  );
};

export default WeatherButton;
