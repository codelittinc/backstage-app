const getDifferenceInHoursBetweenTwoDateTimes = (date1, date2) => {
  let totalHours = 0;

  if (date2 > date1) {
    [date1, date2] = [date2, date1];
  }

  const oneDayInMs = 24 * 60 * 60 * 1000;

  const current = new Date(date2);
  current.setHours(24, 0, 0, 0);

  while (current <= date1) {
    if (current.getDay() !== 0 && current.getDay() !== 6) {
      totalHours += 24;
    }
    current.setTime(current.getTime() + oneDayInMs);
  }

  if (date2.getDay() !== 0 && date2.getDay() !== 6) {
    totalHours -= date2.getHours();
  }

  if (date1.getDay() !== 0 && date1.getDay() !== 6) {
    totalHours += date1.getHours();
  }

  return totalHours;
};

export default getDifferenceInHoursBetweenTwoDateTimes;
