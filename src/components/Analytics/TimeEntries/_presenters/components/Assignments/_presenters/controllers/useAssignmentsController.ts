import { useQuery } from "@tanstack/react-query";

import tanstackKeys from "@/app/_domain/enums/tanstackKeys";
import { getAssignments } from "@/app/_presenters/data/assignments";

const useAssignmentsController = (
  startDateFilter: string,
  endDateFilter: string,
  project?: Project
) => {
  const { data, isLoading } = useQuery({
    queryKey: [tanstackKeys.Assignments, startDateFilter, endDateFilter],
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

export default useAssignmentsController;
