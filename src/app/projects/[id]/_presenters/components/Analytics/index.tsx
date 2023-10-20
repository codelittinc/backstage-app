import Box from "@/components/Box";
import { useState } from "react";
import DatePicker from "@/components/DatePicker";
import { Grid } from "@mui/material";
import Autocomplete from "@/components/Autocomplete";
import IssuesSection from "./_presenters/components/IssuesSection";
import { PullRequestsSection } from "./_presenters/components/PullRequestsSection";

const Analytics = ({ project }: { project: Project }) => {
  const [startDateFilter, setStartDateFilter] = useState<string>(
    project.start_date!
  );
  const [endDateFilter, setEndDateFilter] = useState<string>(project.end_date!);
  const [dateInterval, setdateInterval] = useState<string>("weeks");

  const showIssues = !!project.customer.ticketTrackingSystemToken;
  const showPullRequests = !!project.customer.sourceControlToken;
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
export default Analytics;
