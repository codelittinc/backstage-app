import Loading from "@/components/Loading";
import MetricCard from "@/components/MetricCard";

import useRequirementsController from "./_presenters/controllers/useRequirementsController";
import useQueryParamController from "@/app/_presenters/controllers/useQueryParamController";
import customParamKeys from "@/app/_domain/enums/customParamKeys";

type Props = {
  endDate: string;
  project: Project;
  startDate: string;
};
const Requirements = ({ startDate, endDate, project }: Props): JSX.Element => {
  const { getCustomParamValue } = useQueryParamController();
  const statementOWorkId = getCustomParamValue(
    customParamKeys.statementOfWorkId
  );
  const { requirements, isLoading } = useRequirementsController(
    startDate,
    endDate,
    project.id,
    statementOWorkId as number
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
