import { Grid, Icon, Switch } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import React from "react";

import tanstackKeys from "@/app/_domain/enums/tanstackKeys";
import { StatementOfWork } from "@/app/_domain/interfaces/StatementOfWork";
import useDateRangeController from "@/app/_presenters/controllers/queries/useDateRangeController";
import { getStatementOfWorks } from "@/app/projects/_presenters/components/ProjectForm/_presenters/components/StatementsOfWork/_presenters/data/services/statementsOfWork";
import Box from "@/components/Box";
import Button from "@/components/Button";
import Loading from "@/components/Loading";
import MetricCard from "@/components/MetricCard";
import PageFilterContainer from "@/components/PageFilterContainer";
import PeriodPageFilter from "@/components/PageFilters/PeriodPageFilter";
import StatementOfWorkFilter from "@/components/PageFilters/StatementOfWorkFilter";
import Typography from "@/components/Typography";
import routes from "@/routes";

import RequirementsTable from "./_presenters/components/RequirementsTable";
import useResourcesController from "./_presenters/controllers/useResourcesController";
import {
  getFirstDayOfCurrentMonth,
  getLastDayOfCurrentMonth,
} from "@/app/_presenters/utils/date";
import useQueryParamController from "@/app/_presenters/controllers/useQueryParamController";

type Props = {
  project: Project;
};

type TableItem = {
  endDate: string;
  startDate: string;
};

const filterItems = (items: TableItem[]) => {
  return items.filter((item) => {
    const requirementStartDate = new Date(item.startDate);
    const requirementEndDate = new Date(item.endDate);

    if (
      requirementStartDate <= new Date() &&
      requirementEndDate >= new Date()
    ) {
      return true;
    }
  });
};

const Resources = ({ project }: Props) => {
  const router = useRouter();

  const { data: statementsOfWork } = useQuery({
    queryKey: [tanstackKeys.StatementsOfWork, project.id],
    queryFn: () => getStatementOfWorks(project.id!),
  });

  const { startDate, endDate, updateDateRangeQuery } = useDateRangeController(
    getFirstDayOfCurrentMonth(),
    getLastDayOfCurrentMonth()
  );

  const statementsOfWorkFilter = statementsOfWork;
  const [statementOfWork, setStatementOfWork] = useState<StatementOfWork>();

  useEffect(() => {
    if (statementOfWork?.startDate) {
      updateDateRangeQuery(
        new Date(statementOfWork.startDate),
        new Date(statementOfWork.endDate)
      );
    }
    // eslint-disable-next-line
  }, [
    statementOfWork?.id,
    statementOfWork?.startDate,
    statementOfWork?.endDate,
  ]);

  const { requirements, assignments } = useResourcesController(
    startDate,
    endDate,
    statementOfWork,
    project
  );

  const [onlyDisplayActive, setOnlyDisplayActive] = useState<boolean>(true);
  const filteredRequirements = onlyDisplayActive
    ? filterItems(requirements)
    : requirements;
  const filteredAssignments = onlyDisplayActive
    ? filterItems(assignments)
    : assignments;

  const requirementsCoverage = filteredRequirements.reduce(
    (acc, requirement) => {
      return acc + requirement.coverage;
    },
    0
  );

  const assinmentsCoverage = filteredAssignments.reduce((acc, assignment) => {
    return acc + assignment.coverage;
  }, 0);

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
        <Grid item xs={5} ml={1}>
          <Box display="flex" alignItems="center" lineHeight={1}>
            <Typography variant="body2">
              Only display resources active today
            </Typography>
            <Box ml={1}></Box>
            <Switch
              checked={onlyDisplayActive}
              onChange={() => {
                setOnlyDisplayActive(!onlyDisplayActive);
              }}
            />
          </Box>
        </Grid>
      </PageFilterContainer>
      <Grid container spacing={3} mt={3}>
        <Grid item xs={12}>
          <Box pb={3}>
            <Button
              variant="gradient"
              color="info"
              onClick={() =>
                router.push(
                  routes.requirementPath(
                    "new",
                    statementOfWork.id!,
                    project.id!
                  )
                )
              }
            >
              <Icon>add</Icon>&nbsp; Requirement
            </Button>
          </Box>
        </Grid>
        <Grid item xs={9}>
          <RequirementsTable
            requirements={filteredRequirements}
            assignments={filteredAssignments}
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
            <MetricCard
              text="Required resources"
              metric={requirementsCoverage}
            />
            <Box mt={2}></Box>
            <MetricCard text="Assigned resources" metric={assinmentsCoverage} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Resources;
