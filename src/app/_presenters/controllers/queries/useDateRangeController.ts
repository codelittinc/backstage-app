import { format } from "path";
import useQueryParamController from "../useQueryParamController";

const START_DATE_KEY = "startDate";
const END_DATE_KEY = "endDate";

const formatDate = (date: Date | undefined): string | undefined => {
  if (!date) return undefined;
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);

  const [month, day, year] = formattedDate.split("/");
  return `${year}-${month}-${day}`;
};

const useDateRangeController = (
  defaultStartDate?: Date,
  defaultEndDate?: Date
) => {
  const { setCustomParams, getCustomParamValue } = useQueryParamController();

  const updateDateRangeQuery = (startDate: Date, endDate?: Date) => {
    const formattedStartDate = formatDate(startDate);
    const formattedEndDate = endDate ? formatDate(endDate) : undefined;

    setCustomParams([
      {
        key: START_DATE_KEY,
        value: formattedStartDate,
      },
      {
        key: END_DATE_KEY,
        value: formattedEndDate,
      },
    ]);
  };

  const startDate = getCustomParamValue(
    START_DATE_KEY,
    formatDate(defaultStartDate) ?? ""
  ) as string;

  const endDate = getCustomParamValue(
    END_DATE_KEY,
    formatDate(defaultEndDate) ?? ""
  ) as string;

  return {
    startDate,
    endDate,
    updateDateRangeQuery,
  };
};

export default useDateRangeController;
