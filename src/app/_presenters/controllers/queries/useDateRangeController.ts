import useQueryParamController from "../useQueryParamController";

const START_DATE_KEY = "startDate";
const END_DATE_KEY = "endDate";

const useDateRangeController = (
  defaultStartDate?: Date,
  defaultEndDate?: Date
) => {
  const { setCustomParams, getCustomParamValue } = useQueryParamController();

  const updateDateRangeQuery = (startDate: Date, endDate?: Date) => {
    setCustomParams([
      {
        key: START_DATE_KEY,
        value: startDate.toISOString(),
      },
      {
        key: END_DATE_KEY,
        value: endDate?.toISOString(),
      },
    ]);
  };

  const startDate = getCustomParamValue(
    START_DATE_KEY,
    defaultStartDate?.toISOString() ?? ""
  ) as string;

  const endDate = getCustomParamValue(
    END_DATE_KEY,
    defaultEndDate?.toISOString() ?? ""
  ) as string;

  return {
    startDate,
    endDate,
    updateDateRangeQuery,
  };
};

export default useDateRangeController;
