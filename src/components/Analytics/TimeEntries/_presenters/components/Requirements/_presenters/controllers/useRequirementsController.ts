import { useQuery } from "@tanstack/react-query";

import {
  REQUIREMENTS_KEY,
  getRequirements,
} from "../data/services/requirements";

const useRequirementsController = (
  startDateFilter: string,
  endDateFilter: string,
  project?: Project
) => {
  const { data, isLoading } = useQuery({
    queryKey: [REQUIREMENTS_KEY, startDateFilter, endDateFilter],
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
