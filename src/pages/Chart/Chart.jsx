import React, { Component } from 'react';
import "./Chart.scss";
import HomeButton from "../../components/HomeButton";
import { Button } from "../../components/Button";
import bookBlank_edge from "../../../public/img/bookBlank_edge.png";
import axios from "axios";
import { BASE_URL } from "../../utils/URL";

function Chart() {
  const Title = ( { title, content } ) => {
    return (
      <section className='chart-title'>
        <h1>{title}</h1>
        <p>{content}</p>
      </section>
    );
  }

  const ContainerDoromari = () => {
    return (
      <section className="chart-container container-doromari">
        <div className="item"></div>
      </section>
    );
  }

  const ContainerBookBlank = () => {
    return (
      <section>
        <img
          src={bookBlank_edge}
          alt="bookBlank_edge"
          style={{ display: "inline-block", verticalAlign: "bottom", width: "100%", maxWidth: "1280px", }}
        />
        <div className="chart-container container-bookBlank">
          {/* 차트 내용 */}
        </div>
        <img
          src={bookBlank_edge}
          alt="bookBlank_edge"
          style={{ transform: "scaleY(-1)", width: "100%", maxWidth: "1280px", }}
        />
      </section>
    );
  }

  return (
    <>
      <HomeButton />

      <main className="chart-page">
        <section className="chart-wrapper">
          <Title title="나의 기억 건강 관리" content="월별 건강 상태의 추이를 살피고 관리해보세요." />

          <ContainerBookBlank />
        </section>
      </main>
    </>
  );
}

export default Chart