import { useParams } from "next/navigation";

import useUsersController from "@/app/_presenters/controllers/useUsersController";
import {
  PULL_REQUESTS_KEY,
  getPullRequests,
} from "@/app/projects/[id]/_presenters/components/PerformanceMetrics/_presenters/components/PullRequestsSection/_presenters/data/services/pullRequests";
import { useQuery } from "@tanstack/react-query";

const useUserPullRequestsController = (startDate: string, endDate: string) => {
  const { id: userId } = useParams();

  const { users, isLoading: isLoadingUsers } = useUsersController();

  const user = users?.find((user) => user.slug === userId);

  const { data: pullRequests, isLoading: isLoadinPullRequests } = useQuery({
    queryKey: [PULL_REQUESTS_KEY, startDate, endDate],
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
