import { Grid } from "@mui/material";

import useQueryParamController from "@/app/_presenters/controllers/useQueryParamController";
import { getSameDayLastMonth } from "@/app/_presenters/utils/date";
import DateRangePicker from "@/components/DateRangePicker";

import UserPullRequests from "./_presenters/components/UserPullRequests";

const START_DATE_KEY = "startDate";
const END_DATE_KEY = "endDate";
const PerformanceMetrics = () => {
  const defaultStartDate = getSameDayLastMonth(new Date());
  const defaultEndDate = new Date();

  const { setCustomParams, getCustomParamValue } = useQueryParamController([
    {
      key: START_DATE_KEY,
      defaultValue: defaultStartDate.toISOString(),
    },
    {
      key: END_DATE_KEY,
      defaultValue: defaultEndDate.toISOString(),
    },
  ]);
  const updateDateFilters = (startDate: Date, endDate: Date) => {
    setCustomParams([
      {
        key: START_DATE_KEY,
        value: startDate.toISOString(),
      },
      {
        key: END_DATE_KEY,
        value: endDate.toISOString(),
      },
    ]);
  };

  const startDateFilter = getCustomParamValue(
    START_DATE_KEY,
    defaultStartDate.toISOString()
  ) as string;

  const endDateFilter = getCustomParamValue(
    END_DATE_KEY,
    defaultEndDate.toISOString()
  ) as string;

  return (
    <Grid container>
      <Grid item xs={12}>
        <Grid container mb={3} mt={3}>
          <Grid item mr={2} xs={2}>
            <DateRangePicker
              startDate={startDateFilter}
              endDate={endDateFilter}
              onDateRangeChange={(startDate, endDate) => {
                updateDateFilters(startDate, endDate);
              }}
            />
          </Grid>
        </Grid>
        <UserPullRequests startDate={startDateFilter} endDate={endDateFilter} />
      </Grid>
    </Grid>
  );
};

export default PerformanceMetrics;
