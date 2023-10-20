import Box from "@/components/Box";
import AllPullRequestsChart from "./_presenters/components/PullRequestsChart";
import PullRequestsByUserChart from "./_presenters/components/PullRequestsByUserChart";
import IssuesChart from "./_presenters/components/IssuesChart ";
import Typography from "@/components/Typography";
import IssuesEffortChart from "./_presenters/components/IssuesEffortChart ";
import { useState } from "react";
import DatePicker from "@/components/DatePicker";
import { Grid } from "@mui/material";
import Autocomplete from "@/components/Autocomplete";
import PullRequestReviewsByUserChart from "./_presenters/components/PullRequestReviewsByUserChart";

const Analytics = ({ project }: { project: Project }) => {
  const [startDateFilter, setStartDateFilter] = useState<string>(
    project.start_date!
  );
  const [endDateFilter, setEndDateFilter] = useState<string>(project.end_date!);
  const [dateInterval, setdateInterval] = useState<string>("weeks");

  return (
    <Box>
      <Grid container mb={3} mt={3}>
        <Grid item mr={2}>
          <DatePicker
            label="Start date"
            value={[startDateFilter]}
            onChange={(e: Array<string>) => {
              setStartDateFilter(e[0]);
            }}
          />
        </Grid>
        <Grid item>
          <DatePicker
            label="End date"
            value={endDateFilter}
            onChange={(e: Array<string>) => {
              setEndDateFilter(e[0]);
            }}
          />
        </Grid>
        <Grid item sm={2}>
          <Autocomplete
            label={"Time scale"}
            value={dateInterval}
            options={["days", "weeks", "months"]}
            onChange={(value) => setdateInterval(value)}
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
              interval={dateInterval}
            />
          </Grid>
          <Grid item sm={6}>
            <IssuesEffortChart
              project={project}
              startDateFilter={startDateFilter}
              endDateFilter={endDateFilter}
              interval={dateInterval}
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
            interval={dateInterval}
          />
        </Grid>
        <Grid item sm={6}>
          <PullRequestsByUserChart
            project={project}
            startDateFilter={startDateFilter}
            endDateFilter={endDateFilter}
            interval={dateInterval}
          />
        </Grid>
      </Grid>
      <Box mb={5} mt={3}>
        <Typography variant="h3">Pull request reviews</Typography>
      </Box>
      <Grid container spacing={3}>
        <Grid item sm={6}>
          <PullRequestReviewsByUserChart
            project={project}
            startDateFilter={startDateFilter}
            endDateFilter={endDateFilter}
            interval={dateInterval}
          />
        </Grid>
      </Grid>
    </Box>
  );
};
export default Analytics;
