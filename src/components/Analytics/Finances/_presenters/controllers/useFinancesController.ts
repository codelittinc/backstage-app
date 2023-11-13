import { useQuery } from "@tanstack/react-query";

import { getStatementOfWorks } from "@/app/projects/_presenters/components/ProjectForm/_presenters/components/StatementsOfWork/_presenters/data/services/statementsOfWork";

import { getFinancesAnalytics } from "../data/services/finances";

const useTimeEntriesController = (
  startDate: string,
  endDate: string,
  project?: Project
) => {
  const { data, isLoading } = useQuery({
    queryKey: ["analytics", "finances", project?.id, startDate, endDate],
    queryFn: () => getFinancesAnalytics(startDate, endDate, project?.id),
  });

  return {
    finances: data,
    isLoading,
  };
};

export default useTimeEntriesController;
