import { useQuery } from "@tanstack/react-query";

import { getStatementOfWorks } from "@/app/projects/_presenters/components/ProjectForm/_presenters/components/StatementsOfWork/_presenters/data/services/statementsOfWork";

import { getTimeEntriesAnalytics } from "../data/services/timeEntriesAnalytics";

const useTimeEntriesController = (
  startDate: string,
  endDate: string,
  project?: Project
) => {
  const { data, isLoading } = useQuery({
    queryKey: ["analytics", "time_entries", startDate, endDate, project?.id],
    queryFn: () => getTimeEntriesAnalytics(startDate, endDate, project?.id),
  });

  return {
    timeEntries: data,
    isLoading,
  };
};

export default useTimeEntriesController;
