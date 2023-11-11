import React, { useState } from "react";
import axios from "axios";

const ImageUploader = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      // FileReader를 사용하여 이미지 미리보기
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUpload = async () => {
    if (selectedImage) {
      try {
        // 이미지를 서버에 업로드하고 URL을 받아옴
        const response = await axios.post("서버 업로드 URL", {
          image: selectedImage,
        });

        // 서버 응답을 처리 (예: 이미지 URL을 어딘가에 저장)
        const imageURL = response.data.imageUrl;
        console.log("Image uploaded. URL:", imageURL);

        // TODO: imageURL을 사용하여 서버에 전송할 수 있음
      } catch (error) {
        console.error("Image upload failed:", error);
      }
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      {selectedImage && <img src={selectedImage} alt="Preview" />}
      <button onClick={handleImageUpload}>Upload Image</button>
    </div>
  );
};

export default ImageUploader;
