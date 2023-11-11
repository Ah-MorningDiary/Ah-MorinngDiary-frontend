import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom"; // Import useNavigate instead of useHistory
import { Button } from "../../components/Button";

const Error = () => {
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  const handleGoBack = () => {
    navigate("/home"); // Use the navigate function to navigate to the "/home" route
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.6 }}
    >
      <div className="loader-container">
        <img src="/img/logo.png" width={"300px"} alt="Logo" />
        <text className="font">에러페이지</text>
        <Button type="btn-start" onClick={handleGoBack}>
          돌아가기
        </Button>
      </div>
    </motion.div>
  );
};

export default Error;
