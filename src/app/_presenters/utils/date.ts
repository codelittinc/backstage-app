import { addDays, startOfWeek, subWeeks } from "date-fns";

export const getFirstDayOfCurrentMonth = (): Date => {
  const date = new Date();
  return new Date(date.getFullYear(), date.getMonth(), 1);
};

export const getLastDayOfCurrentMonth = (): Date => {
  const date = new Date();
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
};

export const getSameDayLastMonth = (date: Date): Date => {
  return new Date(date.getFullYear(), date.getMonth() - 1, date.getDate());
};

export const getLastSunday = (): Date => {
  return startOfWeek(subWeeks(new Date(), 1), {
    weekStartsOn: 0,
  });
};

export const getLastSaturday = (): Date => {
  return addDays(getLastSunday(), 6);
};

export function formatDateToMonthDayYear(isoDate: string | Date): string {
  const date = new Date(isoDate);
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-indexed
  const day = date.getDate().toString().padStart(2, "0");
  const year = date.getFullYear();

  return `${month}/${day}/${year}`;
}

export function formatDateToMonthDay(isoDate: string | Date): string {
  const date = new Date(isoDate);
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-indexed
  const day = date.getDate().toString().padStart(2, "0");
  const year = date.getFullYear();

  return `${month}/${day}`;
}

export const getFirstDayOfTheWeek = (date: Date | string): Date => {
  return startOfWeek(new Date(date), { weekStartsOn: 0 });
};

export const getLastDayOfTheWeek = (date: Date | string): Date => {
  return addDays(startOfWeek(new Date(date), { weekStartsOn: 0 }), 6);
};

export const getDaysBetweenTwoDates = (
  startDate: Date,
  endDate: Date
): Date[] => {
  const dates = [];
  let currentDate = startDate;
  while (currentDate <= endDate) {
    dates.push(currentDate);
    currentDate = addDays(currentDate, 1);
  }
  return dates;
};
