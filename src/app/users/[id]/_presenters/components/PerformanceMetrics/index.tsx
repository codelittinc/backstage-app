import { Grid } from "@mui/material";

import useDateRangeController from "@/app/_presenters/controllers/queries/useDateRangeController";
import { getSameDayLastMonth } from "@/app/_presenters/utils/date";
import DateRangePicker from "@/components/DateRangePicker";

import UserPullRequests from "./_presenters/components/UserPullRequests";

const PerformanceMetrics = () => {
  const defaultStartDate = getSameDayLastMonth(new Date());
  const defaultEndDate = new Date();

  const { startDate, endDate, updateDateRangeQuery } = useDateRangeController(
    defaultStartDate,
    defaultEndDate
  );

  return (
    <Grid container>
      <Grid item xs={12}>
        <Grid container mb={3} mt={3}>
          <Grid item mr={2} xs={2}>
            <DateRangePicker
              startDate={startDate}
              endDate={endDate}
              onDateRangeChange={(startDate, endDate) => {
                updateDateRangeQuery(startDate, endDate);
              }}
            />
          </Grid>
        </Grid>
        <UserPullRequests startDate={startDate} endDate={endDate} />
      </Grid>
    </Grid>
  );
};

export default PerformanceMetrics;
