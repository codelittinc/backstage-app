import { Grid, Icon } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import React from "react";

import tanstackKeys from "@/app/_domain/enums/tanstackKeys";
import { StatementOfWork } from "@/app/_domain/interfaces/StatementOfWork";
import useDateRangeController from "@/app/_presenters/controllers/queries/useDateRangeController";
import { getStatementOfWorks } from "@/app/projects/_presenters/components/ProjectForm/_presenters/components/StatementsOfWork/_presenters/data/services/statementsOfWork";
import Box from "@/components/Box";
import Button from "@/components/Button";
import Loading from "@/components/Loading";
import PageFilterContainer from "@/components/PageFilters/PageFilterContainer";
import PeriodPageFilter from "@/components/PageFilters/PeriodPageFilter";
import StatementOfWorkFilter from "@/components/PageFilters/StatementOfWorkFilter";
import routes from "@/routes";

import RequirementsTable from "./_presenters/components/RequirementsTable";
import useResourcesController from "./_presenters/controllers/useResourcesController";
import {
  getFirstDayOfTheWeek,
  getLastDayOfTheWeek,
} from "@/app/_presenters/utils/date";
import Requirements from "@/components/Analytics/TimeEntries/_presenters/components/Requirements";
import Assignments from "@/components/Analytics/TimeEntries/_presenters/components/Assignments";

type Props = {
  project: Project;
};

const Resources = ({ project }: Props) => {
  const router = useRouter();

  const { data: statementsOfWork } = useQuery({
    queryKey: [tanstackKeys.StatementsOfWork, project.id],
    queryFn: () => getStatementOfWorks(project.id!),
  });

  const { startDate, endDate, updateDateRangeQuery } = useDateRangeController(
    getFirstDayOfTheWeek(),
    getLastDayOfTheWeek()
  );

  const statementsOfWorkFilter = statementsOfWork;
  const [statementOfWork, setStatementOfWork] = useState<StatementOfWork>();

  const { requirements, assignments } = useResourcesController(
    startDate,
    endDate,
    statementOfWork,
    project
  );

  if (statementsOfWork?.length === 0) {
    return <Box>There are no statements of work for this project.</Box>;
  }

  if (!statementsOfWork) {
    return <Loading />;
  }

  return (
    <Grid item xs={12}>
      <PageFilterContainer>
        <StatementOfWorkFilter
          statementOfWork={statementOfWork}
          statementsOfWork={statementsOfWorkFilter}
          onChange={setStatementOfWork}
        />
        <PeriodPageFilter
          startDate={startDate}
          endDate={endDate}
          onChange={updateDateRangeQuery}
        />
      </PageFilterContainer>
      <Grid container spacing={3} mt={1}>
        <Grid item xs={12}>
          <Box>
            <Button
              variant="gradient"
              color="info"
              onClick={() => {
                if (statementOfWork?.id == 0) {
                  alert("Please select a specific statement of work");
                } else {
                  router.push(
                    routes.requirementPath(
                      "new",
                      statementOfWork.id!,
                      project.id!
                    )
                  );
                }
              }}
            >
              <Icon>add</Icon>&nbsp; Requirement
            </Button>
          </Box>
        </Grid>
        <Grid item xs={9}>
          <RequirementsTable
            requirements={requirements}
            assignments={assignments}
            project={project}
          />
        </Grid>
        <Grid item xs={3}>
          <Grid
            container
            direction="column"
            alignItems="center"
            display={"flex"}
          >
            <Requirements
              startDate={startDate}
              endDate={endDate}
              project={project}
            />
            <Box mt={2}></Box>
            <Assignments
              startDate={startDate}
              endDate={endDate}
              project={project}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Resources;
