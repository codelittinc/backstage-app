import { Card, Checkbox, Grid, Switch } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import React from "react";

import tanstackKeys from "@/app/_domain/enums/tanstackKeys";
import { StatementOfWork } from "@/app/_domain/interfaces/StatementOfWork";
import useDateRangeController from "@/app/_presenters/controllers/queries/useDateRangeController";
import { getStatementOfWorks } from "@/app/projects/_presenters/components/ProjectForm/_presenters/components/StatementsOfWork/_presenters/data/services/statementsOfWork";
import Assignments from "@/components/Analytics/TimeEntries/_presenters/components/Assignments";
import Requirements from "@/components/Analytics/TimeEntries/_presenters/components/Requirements";
import Autocomplete from "@/components/Autocomplete";
import Box from "@/components/Box";
import DateRangePicker from "@/components/DateRangePicker";
import Typography from "@/components/Typography";

import RequirementsTable from "./_presenters/components/RequirementsTable";
import useResourcesController from "./_presenters/controllers/useResourcesController";

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

  const defaultStartDate = new Date();
  const defaultEndDate = new Date();
  const { startDate, endDate, updateDateRangeQuery } = useDateRangeController(
    defaultStartDate,
    defaultEndDate
  );

  const smallestStartDate = statementsOfWork?.reduce((acc, statementOfWork) => {
    if (new Date(statementOfWork.startDate) < acc) {
      return new Date(statementOfWork.startDate);
    }
    return acc;
  }, new Date());

  const biggestEndDate = statementsOfWork?.reduce((acc, statementOfWork) => {
    if (new Date(statementOfWork.endDate) > acc) {
      return new Date(statementOfWork.endDate);
    }
    return acc;
  }, new Date());

  const [statementOfWorkFilterAll, setStatementOfWorkFilterAll] =
    useState<StatementOfWork>({
      name: "All",
      startDate: smallestStartDate,
      endDate: biggestEndDate,
      projectId: project.id!,
      totalRevenue: 0,
    });

  useEffect(() => {
    setStatementOfWorkFilterAll({
      ...statementOfWorkFilterAll,
      startDate: smallestStartDate,
      endDate: biggestEndDate,
    });
    // eslint-disable-next-line
  }, [statementsOfWork]);

  const statementsOfWorkFilter = [statementOfWorkFilterAll].concat(
    statementsOfWork
  );
  const [statementOfWork, setStatementOfWork] = useState<StatementOfWork>(
    statementsOfWorkFilter[0]
  );

  useEffect(() => {
    if (statementOfWork.startDate) {
      updateDateRangeQuery(
        new Date(statementOfWork.startDate),
        new Date(statementOfWork.endDate)
      );
    }
    // eslint-disable-next-line
  }, [statementOfWork.id, statementOfWork.startDate, statementOfWork.endDate]);

  const { requirements, assignments } = useResourcesController(
    statementOfWork,
    startDate,
    endDate
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
      <Grid item xs={3} direction="column" alignItems="center" display={"flex"}>
        <Card>
          <Box
            padding={5}
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
          >
            <Typography>{requirementsCoverage}</Typography>
            <Typography variant="h6">Required resources</Typography>
          </Box>
        </Card>
        <Box mt={2}></Box>
        <Card>
          <Box
            padding={5}
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
          >
            <Typography>{assinmentsCoverage}</Typography>
            <Typography variant="h6">Assigned resources</Typography>
          </Box>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Resources;
