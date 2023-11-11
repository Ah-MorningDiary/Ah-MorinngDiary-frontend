import "./Button.scss";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophone, faImage } from "@fortawesome/free-solid-svg-icons";
import ImageUploader from "./ImageUploader";
import { useState } from "react";

export const ButtonUploader = () => {
  const [uploadedImage, setUploadedImage] = useState(null);

  const handleImageUpload = (imageData) => {
    setUploadedImage(imageData);
  };

  return (
    <div>
      <ImageUploader onImageUpload={handleImageUpload} />
      {uploadedImage && (
        <div>
          {/* <h3>업로드된 이미지:</h3>
          <img src={uploadedImage} alt="Uploaded" /> */}
        </div>
      )}
    </div>
  );
};

export const ButtonGroup = ({ children, ...rest }) => {
  return (
    <div className="btn-group" {...rest}>
      {children}
    </div>
  );
};

const linkHome = "/home";
const linkWriting = "/writing";
const linkReading = "/reading";
const linkRecord = "/linkRecord";
const linkUpload = "/linkUpload";

export const Button = ({
  type,
  children,
  width,
  fontSize,
  height,
  ...rest
}) => {
  const navigate = useNavigate();
  const [click, setClick] = useState(false);

  const toggleClick = () => {
    setClick(!click);
    ImageUploader();
    console.log("click");
  };

  if (type === "undefined") throw new Error("Button type prop 은 필수입니다");
  else if (type === "primary") {
    return (
      <button
        className="btn-primary btn-default"
        style={{ width: width, height: height, fontSize: fontSize }}
        {...rest}
      >
        {children}
      </button>
    );
  } else if (type === "secondary") {
    return (
      <button
        className="btn-secondary btn-default"
        style={{ width: width, height: height, fontSize: fontSize }}
        {...rest}
      >
        {children}
      </button>
    );
  } else if (type === "btn-kakko") {
    return (
      <button
        className="btn-default btn-group btn-kakao"
        onClick={() => navigate(linkWriting)}
        {...rest}
      >
        <img src="img/kakaobtn-img.png" alt="kakao" />
        <text className="text"> 카카오 계정으로 로그인</text>
        {children}
      </button>
    );
  } else if (type === "btn-mic") {
    return (
      <button className="btn-mic btn-default" {...rest}>
        <div className="icon-container">
          <FontAwesomeIcon icon={faMicrophone} />
          <img src="img/redBookmark.png" alt="mic" />
        </div>
      </button>
    );
  } else if (type === "btn-gallery") {
    return (
      <button className="btn-mic btn-default" onClick={toggleClick} {...rest}>
        <div className="icon-container">
          <FontAwesomeIcon icon={faImage} />
          <img src="img/greenBookmark.png" alt="mic" />
        </div>
      </button>
    );
  } else if (type === "btn-start") {
    return (
      <button
        className="btn-default btn-primary"
        onClick={() => navigate(linkHome)}
        style={{ width: width, height: height, fontSize: fontSize }}
        {...rest}
      >
        {children}
      </button>
    );
  }
};

// export const ButtonAdd = ({ link }) => {
//   const navigate = useNavigate();
//   return (
//     <button className="btn-circle btn-add" onClick={() => navigate(link)}>
//       <FontAwesomeIcon icon={faPlus} />
//     </button>
//   );
// };
