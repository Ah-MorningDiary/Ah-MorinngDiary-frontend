import axios from "axios";

const axios = require("axios"); // HTTP 요청을 보내기 위해 axios 또는 다른 HTTP 클라이언트를 사용할 수 있습니다.

async function transcribeKoreanSpeech(audioFile) {
  const config = {
    method: "POST",
    url: "https://speech.googleapis.com/v1/speech:recognize",
    params: { key: "your_api_key" }, // Google Cloud API 키 설정
    data: {
      audio: {
        content: audioFile, // Base64 인코딩된 음성 데이터
      },
      config: {
        encoding: "LINEAR16",
        sampleRateHertz: 16000,
        languageCode: "ko-KR", // 한국어로 설정
      },
    },
  };

  try {
    const response = await axios(config);
    console.log(
      "음성 인식 결과:",
      response.data.results[0].alternatives[0].transcript
    );
  } catch (error) {
    console.error("API 호출 중 오류:", error);
  }
}
