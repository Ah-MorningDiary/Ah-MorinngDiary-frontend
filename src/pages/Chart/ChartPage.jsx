import React, { useState, useEffect } from 'react';
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
import { Line, Bar } from "react-chartjs-2";
import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

function ChartPage() {
  const Title = ( { title, content } ) => {
    return (
      <section className='chart-title'>
        <h1>{title}</h1>
        <p>{content}</p>
      </section>
    );
  }

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
  }

  // 차트 생성을 위한 데이터 GET 요청
  const params = {
    month: month,
  };

  const [chartData, setChartData] = useState({ riskChanges: [] });

  useEffect(() => {
    // console.log(`current month: `, month); // 월 테스트용
    axios
      .get(`${BASE_URL}/chart/${month}`, { params })
      .then((response) => {
        const { riskChanges } = response.data;
        // 한 달 간 날짜별 위험도
        // List [[date, risk]]
        console.log(
          `한 달 간 날짜별 위험도: ${riskChanges}`
        );
        setChartData({ riskChanges });

        // 차트 생성
      })
      .catch((error) => {
        console.error("Error: failed fetching the chart", error);
      });
  }, [month]);

  const LineChart = () => {
    const data = {
      labels: [ '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', 
        '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', 
        '21', '22', '23', '24', '25', '26', '27', '28', '29', '30' ],
      datasets: [
        {
          label: '1',
          data: [12, 19, 3, 5, 2, 3],
          fill: false,
          backgroundColor: 'white',
          borderColor: '#766E67',
          borderWidth: 3,
          pointRadius: 9, // 데이터 포인트의 반지름을 5px
          pointHoverRadius: 7,
        },
        {
          label: '2',
          data: [12, 19, 3, 5, 2, 3],
          fill: false,
          backgroundColor: 'white',
          borderColor: '#766E67',
          borderWidth: 3,
          pointRadius: 9, // 데이터 포인트의 반지름을 5px
          pointHoverRadius: 7,
        },
      ],
  };

    const options = {
        scales: {
          x: {
            ticks: {
              autoSkip: false, // 모든 라벨 표시
              font: {
                size: 22 // 폰트 사이즈
              }
            },
          },
          y: {
            beginAtZero: true,
            display: false,
          },
        },
        plugins: {
          legend: {
            display: false, // 범례 숨기기
          }, 
        },
        maintainAspectRatio: false, // 가로 세로 비율 유지 안 함
    };

    return <Line data={data} options={options} />;
  }

  const ContainerRiskChanges = () => {
    return (
      <>
        <section>
          <img
            src={bookBlank_edge}
            alt="bookBlank_edge"
            style={{ display: "inline-block", verticalAlign: "bottom", width: "100%", maxWidth: "1280px", }}
          />
          <div className="chart-container container-bookBlank" style={{ width: '100%', height: '260px' }}>
            <button>
              <FontAwesomeIcon icon={faChevronLeft} style={{ width: "2.5rem", height: "2.5rem", }}/>
            </button>
            {/* 차트 내용 */}
            <div className='chart-risk-changes' style={{ width: '200%', height: '100%', }}>
              <LineChart />
            </div>
            <button>
              <FontAwesomeIcon icon={faChevronRight} style={{ width: "2.5rem", height: "2.5rem", }}/>
            </button>
          </div>
          <img
            src={bookBlank_edge}
            alt="bookBlank_edge"
            style={{ transform: "scaleY(-1)", width: "100%", maxWidth: "1280px", }}
          />
        </section>

        <div className="bookmark-month">
          <img src={greenBookMark} />
          <select
            value={month}
            onChange={handleMonthChange}
          >
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
  }

  //
  const BarChart = () => {
    const data = {
      labels: ['위험도별 건수'],
      datasets: [
        {
          label: '위험도별 건수',
          data: [1],
          backgroundColor: '#EDEDED',
          // borderWidth: 100,
          borderRadius: 100, // 모서리 둥글게 처리
          // borderRadius: { topLeft: 10, topRight: 10, bottomLeft: 10, bottomRight: 10 }, // 각 모서리별로 다르게 
        },
        {
          label: '위험도별 건수',
          data: [10],
          backgroundColor: '#AED4E5',
        },
        {
          label: '위험도별 건수',
          data: [10],
          backgroundColor: '#F6BF7E',
        },
        {
          label: '위험도별 건수',
          data: [9],
          backgroundColor: '#DF6045',
        },
      ],
    };

    const options = {
      indexAxis: 'y', // y축을 기준
      scales: {
        x: {
          max: 30, // 30일로 지정
          stacked: true, // x 축을 기준으로 쌓기
          display: false,
        },
        y: {
          stacked: true, // y 축을 기준으로 쌓기
          display: false,
        },
      },
      plugins: {
        legend: {
          display: false, // 범례 숨기기
        }, 
        datalabels: {
          color: '#FFFFFF', // 라벨 색상
          align: 'center', // 라벨 위치
          anchor: 'end', // 라벨 기준점
          formatter: (value, context) => {
            return value + '%';
          },
        },
      },
      maintainAspectRatio: false, // 가로 세로 비율 유지 안 함
    };

    return <Bar data={data} options={options} />;
  };

  const ContainerRiskNums = () => {
    return (
      <>
        <section>
          <img
            src={bookBlank_edge}
            alt="bookBlank_edge"
            style={{ display: "inline-block", verticalAlign: "bottom", width: "100%", maxWidth: "1280px", }}
          />
          <div className="chart-container container-bookBlank">
            <BarChart />
          </div>
          <img
            src={bookBlank_edge}
            alt="bookBlank_edge"
            style={{ transform: "scaleY(-1)", width: "100%", maxWidth: "1280px", }}
          />
        </section>
      </>
    );
  }

  return (
    <>
      <HomeButton />
      <main className="chart-page">
        <section className="chart-wrapper">
          <div className="title-wrapper">
            <Title title="나의 기억 건강 관리" content="월별 건강 상태의 추이를 살피고 관리해보세요." />
            <RiskExamples />
          </div>
          <ContainerRiskChanges />
          <ContainerRiskNums />
        </section>
      </main>
    </>
  );
}

export default ChartPage