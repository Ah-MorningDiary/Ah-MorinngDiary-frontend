export const formatDate = (writeDate) => {
  // 입력 문자열을 Date 객체로 파싱
  const dateObject = new Date(writeDate);

  // 날짜 포맷 옵션
  const options = { year: "numeric", month: "long", day: "numeric" };

  // 옵션을 사용하여 날짜 포맷
  const formattedDate = dateObject.toLocaleDateString("ko-KR", options);

  return formattedDate;
};
