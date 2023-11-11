import React, { Component } from "react";
import "./Chart.scss";
import { Button } from "../../components/Button";

function Chart() {
  return (
    <>
      <main className="quiz-page">
        {/* <div>
              Home
            </div> */}

        <section className="quiz-wrapper">
          {/* Chart1 */}
          <div className="container question">
            <h2>첫 번째 차트</h2>
            <div className="item">{/* 차트 */}</div>
          </div>

          {/* Chart2 */}
          <div className="container question">
            <h2>두 번째 차트</h2>
            <div className="item">{/* 차트 */}</div>
          </div>
        </section>
      </main>
    </>
  );
}

export default Chart;
