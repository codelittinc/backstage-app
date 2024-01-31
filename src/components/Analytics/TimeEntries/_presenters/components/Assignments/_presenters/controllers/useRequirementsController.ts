import { useQuery } from "@tanstack/react-query";

import { ASSIGNMENTS_KEY, getAssignments } from "../data/services/assignments";

const useRequirementsController = (
  startDateFilter: string,
  endDateFilter: string,
  project?: Project
) => {
  const { data, isLoading } = useQuery({
    queryKey: [ASSIGNMENTS_KEY, startDateFilter, endDateFilter],
    queryFn: () =>
      getAssignments({
        projectId: project?.id,
        startDate: startDateFilter,
        endDate: endDateFilter,
      }),
  });

  return {
    assignments: data,
    isLoading: isLoading,
  };
};

export default useRequirementsController;
