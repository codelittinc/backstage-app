import { Box, Card, Typography } from "@mui/material";

import Loading from "@/components/Loading";
import MetricCard from "@/components/MetricCard";

import useAssignmentsController from "./_presenters/controllers/useAssignmentsController";
import useQueryParamController from "@/app/_presenters/controllers/useQueryParamController";
import customParamKeys from "@/app/_domain/enums/customParamKeys";

type Props = {
  endDate: string;
  project: Project;
  startDate: string;
};

const Assignments = ({ startDate, endDate, project }: Props): JSX.Element => {
  const { getCustomParamValue } = useQueryParamController();
  const statementOWorkId = getCustomParamValue(
    customParamKeys.statementOfWorkId
  );

  const { assignments, isLoading } = useAssignmentsController(
    startDate,
    endDate,
    statementOWorkId as number,
    project.id
  );

  if (isLoading) {
    return <Loading />;
  }

  let assinmentsCoverage = assignments.reduce(
    (acc: number, assignment: Assignment) => {
      const { coverage } = assignment;
      return acc + coverage;
    },
    0
  );

  assinmentsCoverage = Math.round(assinmentsCoverage);

  return <MetricCard text="Assigned resources" metric={assinmentsCoverage} />;
};

export default Assignments;
