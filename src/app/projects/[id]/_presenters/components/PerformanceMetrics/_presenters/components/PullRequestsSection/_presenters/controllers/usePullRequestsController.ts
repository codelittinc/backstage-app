import { useQuery } from "@tanstack/react-query";

import tanstackKeys from "@/app/_domain/enums/tanstackKeys";

import { getPullRequests } from "../data/services/pullRequests";
import { formatDateToMonthDayYear } from "@/app/_presenters/utils/date";

const usePullRequestsController = (
  startDateFilter: string,
  endDateFilter: string,
  project?: Project,
  userId?: number,
  state?: "merged" | "open" | "closed"
) => {
  const { data, isLoading } = useQuery({
    queryKey: [
      tanstackKeys.PullRequests,
      formatDateToMonthDayYear(startDateFilter),
      formatDateToMonthDayYear(endDateFilter),
      state,
    ],
    queryFn: () =>
      getPullRequests({
        state: state || "merged",
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
