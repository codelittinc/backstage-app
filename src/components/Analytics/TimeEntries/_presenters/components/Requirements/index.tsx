import Loading from "@/components/Loading";

import useRequirementsController from "./_presenters/controllers/useRequirementsController";
import MetricCard from "@/components/MetricCard";

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

  let requirementsCoverage = requirements.reduce(
    (acc: number, requirement: Requirement) => {
      const { coverage } = requirement;

      return acc + coverage;
    },
    0
  );

  requirementsCoverage = Math.round(requirementsCoverage);

  return <MetricCard text="Required resources" metric={requirementsCoverage} />;
};

export default Requirements;
