import { useQuery } from "@tanstack/react-query";

import tanstackKeys from "@/app/_domain/enums/tanstackKeys";

import { getRequirements } from "../data/services/requirements";

const useRequirementsController = (
  startDateFilter: string,
  endDateFilter: string,
  project?: Project
) => {
  const { data, isLoading } = useQuery({
    queryKey: [tanstackKeys.Requirements, startDateFilter, endDateFilter],
    queryFn: () =>
      getRequirements({
        projectId: project?.id,
        startDate: startDateFilter,
        endDate: endDateFilter,
      }),
  });

  return {
    requirements: data,
    isLoading: isLoading,
  };
};

export default useRequirementsController;
