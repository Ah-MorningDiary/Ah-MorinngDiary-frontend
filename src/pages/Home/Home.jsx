import "./Home.scss";
import { useState } from "react";
import { Button } from "../../components/Button";
import { useNavigate } from "react-router-dom";
import { FlipBook } from "../../components/FilpBook";
import { BASE_URL } from "../../utils/URL";

export default function Home() {
  const linkWriting = "/writing";
  const linkReading = "/reading";
  const navigate = useNavigate();
  const [isTransitioning, setTransitioning] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleClick = (link) => {
    setTransitioning(true);

    setTimeout(() => {
      navigate(link);
      setTransitioning(false);
    }, 2000); // 2초 딜레이
  };

  return (
    <>
      <main className="Diary-wrapper">
        <section className="Diary-container">
          <FlipBook
            left={
              <div
                //Diary-left Diary-page
                className={`Diary-left Diary-page  ${
                  currentPage === 1 ? "active" : ""
                }`}
                onClick={() => {
                  handleClick(linkReading);
                  handlePageChange(1);
                }}
              >
                <div className="bottom">
                  <img className="img" src="/img/logo.png" alt="Logo" />
                  <text className="Diary-text">
                    지난 일기
                    <text className="Diary-text-Large"> 보기</text>
                  </text>
                </div>
              </div>
            }
            mid={
              <div
                className={`Diary-right Diary-page  ${
                  currentPage === 2 ? "active" : ""
                }`}
                onClick={() => {
                  //handleClick(linkWriting);
                  handlePageChange(2);
                }}
              >
                <text className="Diary-text">
                  일기
                  <text className="Diary-text-Large">쓰기</text>
                </text>

                <Button type={"btn-kakko"} color={"black"}></Button>
              </div>
            }
            right={
              <div
                className={`Diary-right Diary-page  ${
                  currentPage === 2 ? "active" : ""
                }`}
                onClick={() => {
                  handleClick(linkWriting);
                  handlePageChange(2);
                }}
              >
                <text className="Diary-text-Large">
                  제작자
                  <text className="Diary-text">
                    <li>이수현</li>
                    <li>권수현</li>
                    <li>김민주</li>
                    <li>김민주</li>
                  </text>
                </text>
              </div>
            }
          />
        </section>
      </main>
    </>
  );
}
