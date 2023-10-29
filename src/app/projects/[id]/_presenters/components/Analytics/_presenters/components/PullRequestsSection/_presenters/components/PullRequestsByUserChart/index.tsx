import usePullRequestsController from "../../controllers/usePullRequestsController";
import DefaultLineChart from "@/components/Charts/DefaultLineChart";
import useUsersController from "@/app/_presenters/controllers/useUsersController";
import { getChartItemColor } from "../../../../../utils/colors";
import { groupByFieldAndInterval } from "../../../../../utils/grouping";
import Loading from "@/components/Loading";

function getUniqueBackstageUserIds(objects) {
  const userIds = new Set();

  objects.forEach((obj) => {
    userIds.add(obj.backstage_user_id);
  });

  return [...userIds];
}

interface Props {
  project: Project;
  startDateFilter?: string | undefined;
  endDateFilter?: string | undefined;
  interval: string;
}

const AllPullRequestsChart = ({
  project,
  startDateFilter,
  endDateFilter,
  interval,
}: Props) => {
  const { pullRequests = [], isLoading } = usePullRequestsController(
    project,
    startDateFilter,
    endDateFilter
  );
  const { users = [], isLoading: isUsersLoading } = useUsersController();

  if (isLoading || isUsersLoading) {
    return <Loading partial height="19.125rem" />;
  }

  const pullRequestsGrouped = groupByFieldAndInterval(
    pullRequests,
    "merged_at",
    interval,
    "backstage_user_id"
  );
  const sortedLabels = [
    ...new Set(pullRequestsGrouped.map((pr) => pr.date).sort()),
  ];

  const userIds = getUniqueBackstageUserIds(pullRequests).filter(
    (userId) => userId
  );

  const tasks = {
    labels: sortedLabels,
    datasets: [
      // Adding the average dataset for the team
      {
        label: "Average",
        // You can set a different color for the average
        color: "black",
        data: sortedLabels.map((sortedLabel) => {
          // Find all pull requests for the specific date
          const allObjectsForDate = pullRequestsGrouped.filter(
            (pr) => pr.date === sortedLabel
          );

          let totalPRs = 0;
          allObjectsForDate.forEach((pr) => {
            totalPRs += pr.objects?.length || 0;
          });

          // Calculate the average
          return allObjectsForDate.length === 0
            ? null
            : totalPRs / allObjectsForDate.length;
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
              )?.objects.length || null
            );
          }),
        };
      }),
    ],
  };

  return (
    <DefaultLineChart
      icon={{ component: "insights" }}
      title="Merged pull request by user"
      chart={tasks}
    />
  );
};
export default AllPullRequestsChart;
