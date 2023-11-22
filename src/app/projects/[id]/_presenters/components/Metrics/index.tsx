import { Grid, Typography } from "@mui/material";

import useQueryParamController from "@/app/_presenters/controllers/useQueryParamController";
import Autocomplete from "@/components/Autocomplete";
import Box from "@/components/Box";
import DatePicker from "@/components/DatePicker";

import IssuesSection from "./_presenters/components/IssuesSection";
import { PullRequestsSection } from "./_presenters/components/PullRequestsSection";

const Metrics = ({ project }: { project: Project }) => {
  const { paramValue: startDateFilter, setParamValue: setStartDateFilter } =
    useQueryParamController("startDate", project.startDate!);

  const { paramValue: endDateFilter, setParamValue: setEndDateFilter } =
    useQueryParamController("endDate", project.endDate!);

  const { paramValue: dateInterval, setParamValue: setdateInterval } =
    useQueryParamController("interval", "weeks");

  const showIssues = project.syncTicketTrackingSystem;
  const showPullRequests = project.syncSourceControl;
  const hasData = showIssues || showPullRequests;

  const updateEndDateFilter = (value: Date) => {
    setEndDateFilter(value.toDateString());
  };

  const updateStartDateFilter = (value: Date) => {
    setStartDateFilter(value.toDateString());
  };

  return (
    <Box>
      {!hasData && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" mb={2}>
            No data available
          </Typography>
        </Box>
      )}
      {hasData && (
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
          <Grid item sm={2}>
            <Autocomplete
              label={"Time scale"}
              value={dateInterval}
              options={["absolute", "days", "weeks", "months"]}
              onChange={(value) => setdateInterval(value)}
            />
          </Grid>
        </Grid>
      )}
      {showIssues && (
        <IssuesSection
          project={project}
          startDateFilter={startDateFilter}
          endDateFilter={endDateFilter}
          interval={dateInterval}
        />
      )}

      {showPullRequests && (
        <PullRequestsSection
          project={project}
          startDateFilter={startDateFilter}
          endDateFilter={endDateFilter}
          interval={dateInterval}
        />
      )}
    </Box>
  );
};
export default Metrics;
