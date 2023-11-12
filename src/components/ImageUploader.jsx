// ImageUploader.jsx
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import "./ImageUploader.scss";

const ImageUploader = ({ onImageUpload }) => {
  const [image, setImage] = useState();

  const onDrop = async (acceptedFiles) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      const reader = new FileReader();

      reader.onload = () => {
        const imageUrl = reader.result;
        setImage(imageUrl);
        onImageUpload(imageUrl); // 이미지 파일과 URL을 상위 컴포넌트로 전달

        // FormData 생성
        const formData = new FormData();
        formData.append("image", file);

        // 상위 컴포넌트로 전달하는 console
        console.log("FormData for Server:", imageUrl);
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
