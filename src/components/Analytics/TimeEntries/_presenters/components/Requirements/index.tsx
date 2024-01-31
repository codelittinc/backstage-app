import { Box, Card, Typography } from "@mui/material";

import Loading from "@/components/Loading";

import useRequirementsController from "./_presenters/controllers/useRequirementsController";

type Props = {
  endDate: string;
  project: Project;
  startDate: string;
};
const Requirements = ({ startDate, endDate, project }: Props): JSX.Element => {
  const { requirements, isLoading } = useRequirementsController(
    startDate,
    endDate,
    project
  );

  if (isLoading) {
    return <Loading />;
  }

  const requirementsCoverage = requirements.reduce(
    (acc: number, requirement) => {
      const { coverage } = requirement;

      return acc + coverage;
    },
    0
  );

  return (
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
  );
};

export default Requirements;
