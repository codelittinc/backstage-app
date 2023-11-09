import { Grid, Typography } from "@mui/material";
import { startOfWeek, addDays, subWeeks } from "date-fns";
import useQueryParamController from "@/app/_presenters/controllers/useQueryParamController";
import Box from "@/components/Box";
import HorizontalBarChart from "@/components/Charts/HorizontalBarChart";
import DatePicker from "@/components/DatePicker";
import Loading from "@/components/Loading";

import useTimeEntriesController from "./_presenters/controllers/useTimeEntriesController";

const lastWeekMonday = startOfWeek(subWeeks(new Date(), 1), {
  weekStartsOn: 1,
});
const lastWeekFriday = addDays(lastWeekMonday, 4);

const TimeEntries = ({ project }: { project: Project }) => {
  const { paramValue: startDateFilter, setParamValue: setStartDateFilter } =
    useQueryParamController(
      "startDate",
      lastWeekMonday.toISOString().split("T")[0]
    );

  const { paramValue: endDateFilter, setParamValue: setEndDateFilter } =
    useQueryParamController(
      "endDate",
      lastWeekFriday.toISOString().split("T")[0]
    );

  const updateEndDateFilter = (value: Date) => {
    setEndDateFilter(value.toDateString());
  };

  const updateStartDateFilter = (value: Date) => {
    setStartDateFilter(value.toDateString());
  };

  const colors = ["success", "error", "info", "warning", "dark"];
  const { timeEntries: data, isLoading } = useTimeEntriesController(
    project,
    startDateFilter,
    endDateFilter
  );

  if (isLoading) {
    return <Loading />;
  }

  const cleanedData = {
    ...data,
    datasets: data.datasets.map((dataset, index) => ({
      ...dataset,
      color: colors[index],
    })),
  };
  return (
    <Box>
      <Grid container mb={3} mt={3}>
        <Grid item mr={2}>
          <DatePicker
            label="Start date"
            value={[new Date(startDateFilter)]}
            onChange={(e: Array<Date>) => {
              updateStartDateFilter(e[0]);
            }}
          />
        </Grid>
        <Grid item>
          <DatePicker
            label="End date"
            value={new Date(endDateFilter)}
            onChange={(e: Array<Date>) => {
              updateEndDateFilter(e[0]);
            }}
          />
        </Grid>
      </Grid>
      <Box>
        <Typography variant="h3">Time entries</Typography>
      </Box>
      <Box mt={1}> </Box>
      <Grid container spacing={3}>
        <Grid item sm={6} xs={12} mt={3}>
          <HorizontalBarChart
            title="Time entries in hours"
            chart={cleanedData}
            height={"40rem"}
          />
        </Grid>
      </Grid>
    </Box>
  );
};
export default TimeEntries;
