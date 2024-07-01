"use client";
import Loading from "@/components/Loading";
import { Grid, Typography } from "@mui/material";
import Avatar from "@/components/Avatar";
import useReportsController from "./presenters/controllers/useReportsController";
import Footer from "./presenters/components/Footer";
import HoursConsumedGraph from "./presenters/components/Graphs/HoursConsumedGraph";
import StatementOfWorkAutoComplete from "./presenters/components/StatementOfWorkAutocomplete";

const ProjectDashboard = () => {
  const {
    project,
    isLoading,
    statementsOfWork,
    selectStatementOfWork,
    selectedStatementOfWork,
  } = useReportsController();

  if (isLoading || !project || !selectedStatementOfWork) {
    return <Loading />;
  }

  return (
    <Grid container>
      <Grid item xs={12} padding={5}>
        <Grid xs={12} justifyContent={"center"} display="flex" mb={3}>
          <Avatar src={project?.logoUrl} />
          <Typography variant={"h2"} ml={2}>
            {project.name}
          </Typography>
        </Grid>
        <Grid xs={12} display={"flex"} justifyContent={"center"}>
          <Grid xs={3}>
            <StatementOfWorkAutoComplete
              statementsOfWork={statementsOfWork}
              selectedStatementOfWork={selectedStatementOfWork}
              onChange={selectStatementOfWork}
            />
          </Grid>
        </Grid>
        <Grid
          item
          xs={12}
          justifyContent={"space-around"}
          display="flex"
          mt={5}
        >
          <Grid item xs={12} md={5}>
            <HoursConsumedGraph statementOfWork={selectedStatementOfWork} />
          </Grid>
        </Grid>
        <Footer />
      </Grid>
    </Grid>
  );
};

export default ProjectDashboard;
