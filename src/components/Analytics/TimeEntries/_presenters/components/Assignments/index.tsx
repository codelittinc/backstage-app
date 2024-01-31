import { Box, Card, Typography } from "@mui/material";

import Loading from "@/components/Loading";

import useRequirementsController from "./_presenters/controllers/useRequirementsController";

type Props = {
  endDate: string;
  project: Project;
  startDate: string;
};
const Assignments = ({ startDate, endDate, project }: Props): JSX.Element => {
  const { assignments, isLoading } = useRequirementsController(
    startDate,
    endDate,
    project
  );

  if (isLoading) {
    return <Loading />;
  }

  const assinmentsCoverage = assignments.reduce((acc: number, assignment) => {
    const { coverage } = assignment;

    return acc + coverage;
  }, 0);

  return (
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
  );
};

export default Assignments;
