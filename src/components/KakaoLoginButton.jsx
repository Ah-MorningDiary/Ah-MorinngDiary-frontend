import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Button";

export const KakaoLoginButton = () => {
  const KAKAO_AUTH_URI2 =
    "https://kauth.kakao.com/oauth/authorize?client_id=9c3c24a4514330fb09be7e30edfb0cf0&redirect_uri=http://43.202.147.59/new/redirect&response_type=code";

  const navigate = useNavigate();

  const handleKakaoLoginClick = () => {
    window.location.href = KAKAO_AUTH_URI2;
  };

  return (
    <Link to="/kakao/login" className="btn-default btn-kakao min-height">
      <img src="img/kakaobtn-img.png" alt="kakao" />
      <span className="text" onClick={handleKakaoLoginClick}>
        카카오 계정으로 로그인
      </span>
    </Link>
  );
};

export default KakaoLoginButton;
