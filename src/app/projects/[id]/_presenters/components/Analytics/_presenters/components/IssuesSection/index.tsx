import Box from "@/components/Box";
import Typography from "@/components/Typography";
import { Grid } from "@mui/material";
import IssuesChart from "./_presenters/components/IssuesChart ";
import IssuesEffortChart from "./_presenters/components/IssuesEffortChart ";

interface Props {
  project: Project;
  startDateFilter?: string | undefined;
  endDateFilter?: string | undefined;
  interval: string;
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
        <Typography variant="h3">Issues</Typography>
      </Box>
      <Box mt={5}>
        <Grid container spacing={3}>
          <Grid item sm={6}>
            <IssuesChart
              project={project}
              startDateFilter={startDateFilter}
              endDateFilter={endDateFilter}
              interval={interval}
            />
          </Grid>
          <Grid item sm={6}>
            <IssuesEffortChart
              project={project}
              startDateFilter={startDateFilter}
              endDateFilter={endDateFilter}
              interval={interval}
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default IssuesSection;
