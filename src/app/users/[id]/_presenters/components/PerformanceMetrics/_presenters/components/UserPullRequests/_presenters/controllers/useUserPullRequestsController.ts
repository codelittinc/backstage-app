import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

import tanstackKeys from "@/app/_domain/enums/tanstackKeys";
import useUsersController from "@/app/_presenters/controllers/useUsersController";
import { getPullRequests } from "@/app/projects/[id]/_presenters/components/PerformanceMetrics/_presenters/components/PullRequestsSection/_presenters/data/services/pullRequests";
import { formatDateToMonthDayYear } from "@/app/_presenters/utils/date";

const useUserPullRequestsController = (startDate: string, endDate: string) => {
  const { id: userId } = useParams();

  const { users, isLoading: isLoadingUsers } = useUsersController();

  const user = users?.find((user) => user.slug === userId);

  const { data: pullRequests, isLoading: isLoadinPullRequests } = useQuery({
    queryKey: [
      tanstackKeys.PullRequests,
      formatDateToMonthDayYear(startDate),
      formatDateToMonthDayYear(endDate),
    ],
    queryFn: () =>
      getPullRequests({
        startDate: startDate,
        endDate: endDate,
        userId: user?.id,
      }),
    enabled: !!user,
  });

  return {
    pullRequests: pullRequests,
    isLoading: isLoadingUsers || isLoadinPullRequests,
  };
};

export default useUserPullRequestsController;
