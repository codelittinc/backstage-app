import { Grid } from "@mui/material";

import Box from "@/components/Box";
import Typography from "@/components/Typography";

import AllIssuesChart from "./_presenters/components/AllIssuesChart";
import AllIssuesEffortChart from "./_presenters/components/AllIssuesEffortChart";
import IssuesByUserChart from "./_presenters/components/IssuesByUserChart ";
import IssuesEffortChart from "./_presenters/components/IssuesEffortChart ";
import CreatedIssuesChart from "./_presenters/components/CreatedIssuesChart";
import IssuesTable from "./_presenters/components/IssuesTable";

interface Props {
  endDateFilter?: string | undefined;
  interval: string;
  project: Project;
  startDateFilter?: string | undefined;
}

const IssuesSection = ({
  project,
  startDateFilter,
  endDateFilter,
  interval,
}: Props) => {
  return (
    <>
      <Box>
        <Typography variant="h3">Tasks</Typography>
      </Box>
      <Box mt={1}> </Box>
      <Grid container spacing={3}>
        <Grid item sm={6} xs={12} mt={3}>
          <AllIssuesChart
            project={project}
            startDateFilter={startDateFilter}
            endDateFilter={endDateFilter}
            interval={interval}
          />
        </Grid>
        <Grid item sm={6} xs={12} mt={3}>
          <CreatedIssuesChart
            project={project}
            startDateFilter={startDateFilter}
            endDateFilter={endDateFilter}
            interval={interval}
          />
        </Grid>
        <Grid item sm={6} xs={12} mt={3}>
          <AllIssuesEffortChart
            project={project}
            startDateFilter={startDateFilter}
            endDateFilter={endDateFilter}
            interval={interval}
          />
        </Grid>
        <Grid item xs={12} mt={3}>
          <IssuesByUserChart
            project={project}
            startDateFilter={startDateFilter}
            endDateFilter={endDateFilter}
            interval={interval}
          />
        </Grid>
        <Grid item xs={12} mt={3}>
          <IssuesEffortChart
            project={project}
            startDateFilter={startDateFilter}
            endDateFilter={endDateFilter}
            interval={interval}
          />
        </Grid>
        <Grid item xs={12} mt={3}>
          <IssuesTable
            project={project}
            startDateFilter={startDateFilter}
            endDateFilter={endDateFilter}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default IssuesSection;
