import { Card, Grid, Icon, Typography } from "@mui/material";

import useDateRangeController from "@/app/_presenters/controllers/queries/useDateRangeController";
import useQueryParamController from "@/app/_presenters/controllers/useQueryParamController";
import { getSameDayLastMonth } from "@/app/_presenters/utils/date";
import Autocomplete from "@/components/Autocomplete";
import Box from "@/components/Box";
import DateRangePicker from "@/components/DateRangePicker";

import IssuesSection from "./_presenters/components/IssuesSection";
import { PullRequestsSection } from "./_presenters/components/PullRequestsSection";
import DynamicDatasetsSection from "./_presenters/components/DynamicDatasetsSection";
import VerticalBarChart from "@/components/Charts/VerticalBarChart";

const Metrics = ({ project }: { project: Project }) => {
  const defaultStartDate = getSameDayLastMonth(new Date());
  const defaultEndDate = new Date();

  const { startDate, endDate, updateDateRangeQuery } = useDateRangeController(
    defaultStartDate,
    defaultEndDate
  );

  const { setCustomParams, getCustomParamValue } = useQueryParamController();

  const showIssues = project.displayTasksMetrics;
  const showPullRequests = project.displayCodeMetrics;
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
        <Grid pb={2}>
          <Card>
            <Grid container p={2}>
              <Grid item xs={12} display={"flex"}>
                <Typography variant="h6">
                  Start by selecting a time period for the data and time scale
                </Typography>
                <Grid item xs={2} ml={1}>
                  <DateRangePicker
                    startDate={startDate}
                    endDate={endDate}
                    onDateRangeChange={(startDate, endDate) => {
                      updateDateRangeQuery(startDate, endDate);
                    }}
                    label=""
                  />
                </Grid>
                <Grid item sm={1} ml={1}>
                  <Autocomplete
                    label={""}
                    value={dateInterval}
                    options={["absolute", "days", "weeks", "months"]}
                    onChange={(value) => setdateInterval(value)}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      )}
      {
        <DynamicDatasetsSection
          project={project}
          startDateFilter={startDate}
          endDateFilter={endDate}
          interval={dateInterval}
        />
      }

      {showIssues && (
        <IssuesSection
          project={project}
          startDateFilter={startDate}
          endDateFilter={endDate}
          interval={dateInterval}
        />
      )}

      {showPullRequests && (
        <PullRequestsSection
          project={project}
          startDateFilter={startDate}
          endDateFilter={endDate}
          interval={dateInterval}
        />
      )}
    </Grid>
  );
};
export default Metrics;
