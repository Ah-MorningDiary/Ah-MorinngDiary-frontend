import React, { Component } from 'react';
import "./Chart.scss";
import HomeButton from "../../components/HomeButton";
import { Button } from "../../components/Button";
import bookBlank_edge from '../../../public/img/bookBlank_edge.png';
import axios from "axios";
import { BASE_URL } from "../../utils/URL";

function Chart() {
  const linkHome = "/home";

  return (
    <>
      <HomeButton />

      <main className="chart-page">
        <section className="chart-wrapper">
          <div className="chart-container container1">
            <div className="item">{/* 차트 */}</div>
          </div>

          <div className="chart-container container2">
            <div className="item">{/* 차트 */}</div>
          </div>
        </section>
      </main>
    </>
  );
}

export default Chart