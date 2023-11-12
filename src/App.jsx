import { useState } from "react";
import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../src/pages/Home/Home";
import Error from "../src/pages/Error/Error";
import Reading from "./pages/Reading/Reading";
import Writing from "./pages/Writing/Writing";
import Quiz from "../src/pages/Quiz/Quiz";
import QuizResult from "../src/pages/Quiz/QuizResult";
import ChartPage from "../src/pages/Chart/ChartPage";
import { Loader } from "./components/Loader";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Loader />} />
          <Route path="/home" element={<Home />} />
          <Route path="/reading" element={<Reading />} />
          <Route path="/writing" element={<Writing />} />
          <Route exact path="/" element={<Home />} />
          <Route path="*" element={<Error />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/quiz/result" element={<QuizResult />} />
          <Route path="/chart" element={<ChartPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
