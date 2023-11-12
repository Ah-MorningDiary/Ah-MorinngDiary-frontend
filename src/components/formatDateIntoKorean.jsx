export const formatDateIntoKorean = (writeDate) => {
  console.log(writeDate, "writeDate");
  //{2023-11-11} -> 2023년 11월 11일로 만드는 함수
  const dateObject = new Date(writeDate);
  const options = { year: "numeric", month: "long", day: "numeric" };
  console.log(dateObject);
  const formattedDate = dateObject.toLocaleDateString("ko-KR", options);
  console.log(formattedDate);
  return formattedDate;
};
