import { useState } from "react";
import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../src/pages/Home/Home";
import Error from "../src/pages/Error/Error";
import Reading from "./pages/Reading/Reading";
import Writing from "./pages/Writing/Writing";
import Quiz from "../src/pages/Quiz/Quiz";
import Chart from "../src/pages/Chart/Chart";
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
          <Route path="/chart" element={<Chart />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
