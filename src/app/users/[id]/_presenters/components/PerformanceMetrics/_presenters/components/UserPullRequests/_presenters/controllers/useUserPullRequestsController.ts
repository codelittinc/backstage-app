import { useParams } from "next/navigation";

import useUsersController from "@/app/_presenters/controllers/useUsersController";
import usePullRequestsController from "@/app/projects/[id]/_presenters/components/PerformanceMetrics/_presenters/components/PullRequestsSection/_presenters/controllers/usePullRequestsController";

const useUserPullRequestsController = (startDate: string, endDate: string) => {
  const { id: userId } = useParams();

  const { users, isLoading: isLoadingUsers } = useUsersController();

  const user = users?.find((user) => user.slug === userId);

  const { pullRequests, isLoading: isLoadinPullRequests } =
    usePullRequestsController(startDate, endDate, undefined, user?.id);

  return {
    pullRequests: pullRequests,
    isLoading: isLoadingUsers || isLoadinPullRequests,
  };
};

export default useUserPullRequestsController;
