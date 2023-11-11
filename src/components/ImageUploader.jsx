import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { BASE_URL } from "../utils/URL";
import "./ImageUploader.scss";

const ImageUploader = ({ onImageUpload }) => {
  const [image, setImage] = useState(null);

  const onDrop = (acceptedFiles) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      const reader = new FileReader();

      reader.onload = () => {
        const imageUrl = reader.result;
        setImage(imageUrl);
        onImageUpload(file); // 실제 파일 객체를 전달

        const formData = new FormData();
        formData.append("image", file); // 이미지 파일 객체를 추가

        const data = {
          context: "오늘은 겁나 피곤한 하루였다!!!!!!",
          whether: "SUNNY",
        };

        console.log(formData);

        axios
          .post(`${BASE_URL}`, formData)
          .then((response) => {
            console.log("서버 응답:", response.data);
          })
          .catch((error) => {
            console.error("서버 요청 중 오류 발생:", error);
          });
      };

      reader.readAsDataURL(file);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
  });

  return (
    <div>
      <div {...getRootProps()} className="dropzoneStyle">
        <input {...getInputProps()} />
        {image ? (
          <img className="imageStyle" src={image} alt="Uploaded" />
        ) : (
          <p>이미지 등록</p>
        )}
      </div>
    </div>
  );
};

export default ImageUploader;
