import { Box, Card, Typography } from "@mui/material";

import Loading from "@/components/Loading";
import MetricCard from "@/components/MetricCard";

import useAssignmentsController from "./_presenters/controllers/useAssignmentsController";

type Props = {
  endDate: string;
  project: Project;
  startDate: string;
};

const Assignments = ({ startDate, endDate, project }: Props): JSX.Element => {
  const { assignments, isLoading } = useAssignmentsController(
    startDate,
    endDate,
    project
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
