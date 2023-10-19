import Box from "@/components/Box";
import AllPullRequestsChart from "./_presenters/components/AllPullRequestsChart";
import PullRequestsByUserChart from "./_presenters/components/PullRequestsByUserChart";
import IssuesChart from "./_presenters/components/IssuesChart ";
import Typography from "@/components/Typography";
import IssuesEffortChart from "./_presenters/components/IssuesEffortChart ";
import { useState } from "react";
import DatePicker from "@/components/DatePicker";
import { Grid } from "@mui/material";
import Autocomplete from "@/components/Autocomplete";

function dateDifferenceType(date1: Date, date2: Date): string {
  const oneDayInMilliseconds = 24 * 60 * 60 * 1000;
  const oneWeekInMilliseconds = oneDayInMilliseconds * 7;
  const oneMonthInMilliseconds = oneDayInMilliseconds * 30; // Approximate value

  const differenceInMilliseconds = Math.abs(date1.getTime() - date2.getTime());

  if (differenceInMilliseconds < oneWeekInMilliseconds * 2) {
    return "days";
  } else if (differenceInMilliseconds < oneMonthInMilliseconds * 3) {
    return "weeks";
  } else {
    return "month";
  }
}

const Analytics = ({ project }: { project: Project }) => {
  const [startDateFilter, setStartDateFilter] = useState<string>(
    project.start_date!
  );
  const [endDateFilter, setEndDateFilter] = useState<string>(project.end_date!);
  const differenceType = dateDifferenceType(
    new Date(startDateFilter),
    new Date(endDateFilter)
  );

  const [timeScale, setTimeScale] = useState<string>("weeks");

  return (
    <Box>
      <Grid container mb={3} mt={3}>
        <Grid item mr={2}>
          <DatePicker
            label="Start date"
            value={[startDateFilter]}
            onChange={(e) => {
              setStartDateFilter(e[0]);
            }}
          />
        </Grid>
        <Grid item>
          <DatePicker
            label="End date"
            value={endDateFilter}
            onChange={(e) => {
              setEndDateFilter(e[0]);
            }}
          />
        </Grid>
        <Grid item sm={2}>
          <Autocomplete
            label={"Time scale"}
            value={timeScale}
            options={["days", "weeks", "months"]}
            onChange={(value) => setTimeScale(value)}
          />
        </Grid>
      </Grid>
      <Box>
        <Typography variant="h3">Issues</Typography>
      </Box>
      <Box mt={5}>
        <Grid container spacing={3}>
          <Grid item sm={6}>
            <IssuesChart
              project={project}
              startDateFilter={startDateFilter}
              endDateFilter={endDateFilter}
              differenceType={timeScale}
            />
          </Grid>
          <Grid item sm={6}>
            <IssuesEffortChart
              project={project}
              startDateFilter={startDateFilter}
              endDateFilter={endDateFilter}
              differenceType={timeScale}
            />
          </Grid>
        </Grid>
      </Box>
      <Box mb={5} mt={3}>
        <Typography variant="h3">Pull requests</Typography>
      </Box>
      <Grid container spacing={3}>
        <Grid item sm={6}>
          <AllPullRequestsChart
            project={project}
            startDateFilter={startDateFilter}
            endDateFilter={endDateFilter}
          />
        </Grid>
        <Grid item sm={6}>
          <PullRequestsByUserChart
            project={project}
            startDateFilter={startDateFilter}
            endDateFilter={endDateFilter}
          />
        </Grid>
      </Grid>
    </Box>
  );
};
export default Analytics;
