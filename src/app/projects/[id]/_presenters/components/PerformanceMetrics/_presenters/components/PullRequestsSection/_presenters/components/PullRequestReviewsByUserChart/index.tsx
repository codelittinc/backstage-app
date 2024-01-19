import useUsersController from "@/app/_presenters/controllers/useUsersController";
import DefaultLineChart from "@/components/Charts/DefaultLineChart";
import Loading from "@/components/Loading";

import { getChartItemColor } from "../../../../../utils/colors";
import { groupByFieldAndInterval } from "../../../../../utils/grouping";
import usePullRequestsController from "../../controllers/usePullRequestsController";

function getUniqueBackstageUserIds(objects) {
  const userIds = new Set();

  objects.forEach((obj) => {
    userIds.add(obj.backstage_user_id);
  });

  return [...userIds];
}

interface Props {
  endDateFilter: string;
  interval: string;
  project: Project;
  startDateFilter: string;
}

const AllPullRequestsChart = ({
  project,
  startDateFilter,
  endDateFilter,
  interval,
}: Props) => {
  const { pullRequests = [], isLoading } = usePullRequestsController(
    startDateFilter,
    endDateFilter,
    project
  );

  const pullRequestsWithReviews = pullRequests.filter(
    (pr) => pr.reviews.length > 0
  );
  const reviews = pullRequestsWithReviews.flatMap((pr) => {
    return pr.reviews.map((review) => {
      return {
        ...review,
        created_at: pr.created_at,
      };
    });
  });

  const { users = [], isLoading: isUsersLoading } = useUsersController();

  if (isLoading || isUsersLoading) {
    return <Loading partial height="19.125rem" />;
  }

  const pullRequestsGrouped = groupByFieldAndInterval(
    reviews,
    "created_at",
    interval,
    "backstage_user_id"
  );
  const sortedLabels = [
    ...new Set(pullRequestsGrouped.map((pr) => pr.date).sort()),
  ];

  const userIds = getUniqueBackstageUserIds(reviews).filter((userId) => userId);

  const tasks = {
    labels: sortedLabels,
    datasets: [
      {
        label: "Average",
        // You can set a different color for the average
        color: "black",
        data: sortedLabels.map((sortedLabel) => {
          // Find all pull requests for the specific date for all users
          const prCountsForDate = userIds.map((userId) => {
            return (
              pullRequestsGrouped.find(
                (pr) =>
                  pr.date === sortedLabel && pr.backstage_user_id == userId
              )?.objects.length || null
            );
          });

          // Calculate the total and average
          const totalPRs = prCountsForDate.reduce(
            (sum, count) => sum + count,
            0
          );
          const averagePRs = totalPRs / userIds.length;

          return averagePRs;
        }),
      },
      ...userIds.map((userId, i) => {
        const user = users!.find((user) => user.id === userId);

        return {
          label: user?.fullName,
          color: getChartItemColor(i),
          data: sortedLabels.map((sortedLabel) => {
            return (
              pullRequestsGrouped.find(
                (pr) =>
                  pr.date === sortedLabel && pr.backstage_user_id == user?.id
              )?.objects.length || 0
            );
          }),
        };
      }),
      // Adding the average dataset for the team
    ],
  };

  return (
    <DefaultLineChart
      icon={{ component: "insights" }}
      title="Pull request reviews per user on merged pull requests"
      chart={tasks}
    />
  );
};
export default AllPullRequestsChart;
