import { useQuery } from "@tanstack/react-query";

import { getIssues } from "../data/services/issues"; // Adjusted the import

const useIssuesController = (
  project: Project,
  startDateFilter: string | undefined,
  endDateFilter: string | undefined
) => {
  const { data, isLoading } = useQuery({
    queryKey: ["issues", project.id, startDateFilter, endDateFilter],
    queryFn: () => getIssues(project, startDateFilter, endDateFilter),
  });

  return {
    issues: data,
    isLoading: isLoading,
  };
};

export default useIssuesController;
