import { Grid, Typography } from "@mui/material";

import useQueryParamController from "@/app/_presenters/controllers/useQueryParamController";
import { getSameDayLastMonth } from "@/app/_presenters/utils/date";
import Autocomplete from "@/components/Autocomplete";
import Box from "@/components/Box";
import DateRangePicker from "@/components/DateRangePicker";

import IssuesSection from "./_presenters/components/IssuesSection";
import { PullRequestsSection } from "./_presenters/components/PullRequestsSection";

const START_DATE_KEY = "startDate";
const END_DATE_KEY = "endDate";

const Metrics = ({ project }: { project: Project }) => {
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
  const showIssues = project.syncTicketTrackingSystem;
  const showPullRequests = project.syncSourceControl;
  const hasData = showIssues || showPullRequests;

  const dateInterval = getCustomParamValue("interval", "weeks") as string;
  const setdateInterval = (value: string) => {
    setCustomParams([{ key: "interval", value: value }]);
  };

  return (
    <Grid item xs={12}>
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
          <Grid item mr={2} xs={2}>
            <DateRangePicker
              startDate={startDateFilter}
              endDate={endDateFilter}
              onDateRangeChange={(startDate, endDate) => {
                updateDateFilters(startDate, endDate);
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
    </Grid>
  );
};
export default Metrics;
