import React, { useState, useEffect } from "react";
import "./Chart.scss";
import HomeButton from "../../components/HomeButton";
import { Button } from "../../components/Button";
import { RiskExamples } from "../../components/RiskFontAwesome";
import bookBlank_edge from "../../../public/img/bookBlank_edge.png";
import greenBookMark from "../../../public/img/greenBookmark.png";
import axios from "axios";
import { BASE_URL } from "../../utils/URL";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

function Chart() {
  const Title = ({ title, content }) => {
    return (
      <section className="chart-title">
        <h1>{title}</h1>
        <p>{content}</p>
      </section>
    );
  };

  // const ContainerDoromari = () => {
  //   return (
  //     <section className="chart-container container-doromari">
  //       <div className="item"></div>
  //     </section>
  //   );
  // }

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1; // getMonth()는 0부터 시작
  const [month, setMonth] = useState(currentMonth);

  const handleMonthChange = (event) => {
    event.preventDefault();
    setMonth(event.target.value);
    console.log("You have selected ", month);
  };

  // 차트 생성을 위한 데이터 GET 요청
  const params = {
    month: month,
  };

  const [chartData, setChartData] = useState({ riskChanges: [], riskNums: [] });

  useEffect(() => {
    axios
      .get(`${BASE_URL}/chart`, { params })
      .then((response) => {
        const { riskChanges, riskNums } = response.data;
        // 한 달 간 날짜별 위험도
        // List [[date, risk]]
        // 한 달 간 위험도별 건수
        // List(안 푼 날 수, 안심 수, 보통 수, 위험 수)
        console.log(
          `한 달 간 날짜별 위험도: ${riskChanges}, 위험도별 건수: ${riskNums}`
        );
        setChartData({ riskChanges, riskNums });

        // 차트 생성
      })
      .catch((error) => {
        console.error("Error: failed fetching the chart", error);
      });
  }, [month]);

  const ContainerRiskChanges = () => {
    return (
      <>
        <section>
          <img
            src={bookBlank_edge}
            alt="bookBlank_edge"
            style={{
              display: "inline-block",
              verticalAlign: "bottom",
              width: "100%",
              maxWidth: "1280px",
            }}
          />
          <div className="chart-container container-bookBlank">
            <button>
              <FontAwesomeIcon
                icon={faChevronLeft}
                style={{ width: "2.5rem", height: "2.5rem" }}
              />
            </button>
            {/* 차트 내용 */}
            <div className="chart-risk-changes"></div>
            <button>
              <FontAwesomeIcon
                icon={faChevronRight}
                style={{ width: "2.5rem", height: "2.5rem" }}
              />
            </button>
          </div>
          <img
            src={bookBlank_edge}
            alt="bookBlank_edge"
            style={{
              transform: "scaleY(-1)",
              width: "100%",
              maxWidth: "1280px",
            }}
          />
        </section>

        <div className="bookmark-month">
          <img src={greenBookMark} />
          <select value={month} onChange={handleMonthChange}>
            <option value="1">1월</option>
            <option value="2">2월</option>
            <option value="3">3월</option>
            <option value="4">4월</option>
            <option value="5">5월</option>
            <option value="6">6월</option>
            <option value="7">7월</option>
            <option value="8">8월</option>
            <option value="9">9월</option>
            <option value="10">10월</option>
            <option value="11">11월</option>
            <option value="12">12월</option>
          </select>
        </div>
      </>
    );
  };

  //
  const ContainerRiskNums = () => {
    return (
      <>
        <section>
          <img
            src={bookBlank_edge}
            alt="bookBlank_edge"
            style={{
              display: "inline-block",
              verticalAlign: "bottom",
              width: "100%",
              maxWidth: "1280px",
            }}
          />
          <div className="chart-container container-bookBlank"></div>
          <img
            src={bookBlank_edge}
            alt="bookBlank_edge"
            style={{
              transform: "scaleY(-1)",
              width: "100%",
              maxWidth: "1280px",
            }}
          />
        </section>
      </>
    );
  };

  return (
    <>
      <HomeButton />
      <main className="chart-page">
        <section className="chart-wrapper">
          <div className="title-wrapper">
            <Title
              title="나의 기억 건강 관리"
              content="월별 건강 상태의 추이를 살피고 관리해보세요."
            />
            <RiskExamples />
          </div>
          <ContainerRiskChanges />
          <ContainerRiskNums />
        </section>
      </main>
    </>
  );
}

export default Chart;
