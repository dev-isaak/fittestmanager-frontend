import dayjs from "dayjs";

export const convertDateType = (date: Date) => {
  return dayjs(date).format('DD/MM/YYYY')
  // return new Date(date).toLocaleDateString("en-GB", {
  //   year: "numeric",
  //   month: "2-digit",
  //   day: "2-digit",
  // });
};