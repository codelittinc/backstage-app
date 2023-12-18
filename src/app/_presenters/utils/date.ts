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
