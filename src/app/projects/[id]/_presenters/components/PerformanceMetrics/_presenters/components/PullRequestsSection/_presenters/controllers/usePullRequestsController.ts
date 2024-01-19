import { useQuery } from "@tanstack/react-query";

import {
  PULL_REQUESTS_KEY,
  getPullRequests,
} from "../data/services/pullRequests";

const usePullRequestsController = (
  startDateFilter: string,
  endDateFilter: string,
  project?: Project,
  userId?: number
) => {
  const { data, isLoading } = useQuery({
    queryKey: [PULL_REQUESTS_KEY, startDateFilter, endDateFilter],
    queryFn: () =>
      getPullRequests({
        state: "merged",
        projectId: project?.id,
        startDate: startDateFilter,
        endDate: endDateFilter,
        userId: userId,
      }),
    refetchInterval: 1000 * 60 * 60 * 24,
  });

  return {
    pullRequests: data,
    isLoading: isLoading,
  };
};

export default usePullRequestsController;
