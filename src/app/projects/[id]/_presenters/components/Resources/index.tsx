import { Card, Grid, Switch } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import React from "react";

import tanstackKeys from "@/app/_domain/enums/tanstackKeys";
import { StatementOfWork } from "@/app/_domain/interfaces/StatementOfWork";
import useDateRangeController from "@/app/_presenters/controllers/queries/useDateRangeController";
import { getStatementOfWorks } from "@/app/projects/_presenters/components/ProjectForm/_presenters/components/StatementsOfWork/_presenters/data/services/statementsOfWork";
import Autocomplete from "@/components/Autocomplete";
import Box from "@/components/Box";
import DateRangePicker from "@/components/DateRangePicker";
import Typography from "@/components/Typography";

import RequirementsTable from "./_presenters/components/RequirementsTable";
import useResourcesController from "./_presenters/controllers/useResourcesController";
import Loading from "@/components/Loading";
import MetricCard from "@/components/MetricCard";

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
  const { data: statementsOfWork } = useQuery({
    queryKey: [tanstackKeys.StatementsOfWork, project.id],
    queryFn: () => getStatementOfWorks(project.id!),
  });

  const { startDate, endDate, updateDateRangeQuery } = useDateRangeController();

  const statementsOfWorkFilter = statementsOfWork;
  const [statementOfWork, setStatementOfWork] = useState<StatementOfWork>();

  useEffect(() => {
    if (statementsOfWork?.length > 0) {
      setStatementOfWork(statementsOfWork[0]);
    }
  }, [statementsOfWork?.length]);

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
    statementOfWork
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

  if (!statementOfWork || !startDate || !endDate) {
    return <Loading />;
  }

  return (
    <Grid container>
      <Grid item xs={12} pb={2}>
        <Card>
          <Grid container p={2}>
            <Grid item xs={12} display={"flex"}>
              <Grid item sm={2} ml={1}>
                <Autocomplete
                  label="Statement of Work"
                  value={statementOfWork}
                  options={statementsOfWorkFilter}
                  onChange={(value: StatementOfWork) =>
                    setStatementOfWork(value)
                  }
                  getOptionLabel={(value: StatementOfWork) => value.name}
                  isOptionEqualToValue={(
                    option: StatementOfWork,
                    value: StatementOfWork
                  ) => option.id === value.id}
                />
              </Grid>
              <Grid item xs={2} ml={1}>
                <DateRangePicker
                  startDate={startDate}
                  endDate={endDate}
                  onDateRangeChange={(startDate, endDate) => {
                    updateDateRangeQuery(startDate, endDate);
                  }}
                  label="Period"
                />
              </Grid>
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
            </Grid>
          </Grid>
        </Card>
      </Grid>
      <Grid item xs={9}>
        <RequirementsTable
          requirements={filteredRequirements}
          assignments={filteredAssignments}
          project={project}
        />
      </Grid>
      <Grid item xs={3}>
        <Grid container direction="column" alignItems="center" display={"flex"}>
          <MetricCard text="Required resources" metric={requirementsCoverage} />
          <Box mt={2}></Box>
          <MetricCard text="Assigned resources" metric={assinmentsCoverage} />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Resources;
