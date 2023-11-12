export const formatDateIntoKorean = (writeDate) => {
  console.log(writeDate, "writeDate");
  //{2023-11-11} -> 2023년 11월 11일로 만드는 함수
  const dateObject = new Date(writeDate);
  // 날짜 포맷 옵션
  const options = { year: "numeric", month: "long", day: "numeric" };
  // 옵션을 사용하여 날짜 포맷
  const formatDateIntoKorean = dateObject.toLocaleDateString("ko-KR", options);
  console.log(formatDateIntoKorean);

  return formatDateIntoKorean;
};
