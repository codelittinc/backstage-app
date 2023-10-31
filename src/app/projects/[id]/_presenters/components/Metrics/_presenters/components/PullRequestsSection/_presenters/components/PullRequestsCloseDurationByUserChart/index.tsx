import useUsersController from "@/app/_presenters/controllers/useUsersController";
import DefaultLineChart from "@/components/Charts/DefaultLineChart";
import Loading from "@/components/Loading";

import getDifferenceInHoursBetweenTwoDateTimes from "./_presenters/utils/getDifferenceInHoursBetweenTwoDateTimes";
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
  endDateFilter?: string | undefined;
  interval: string;
  project: Project;
  startDateFilter?: string | undefined;
}

const PullRequestsCloseDurationByUserChart = ({
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
    "created_at",
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
      {
        label: "Average",
        // You can set a different color for the average
        color: "black",
        data: sortedLabels.map((sortedLabel) => {
          // Find all pull requests for the specific date
          const allObjectsForDate = pullRequestsGrouped.filter(
            (pr) => pr.date === sortedLabel
          );

          let totalDifference = 0;
          let totalCount = 0;
          allObjectsForDate.forEach((pr) => {
            const prDifferenceInHours = pr.objects?.map((object) => {
              const createdAt = new Date(object.created_at);
              const closedAt = new Date(object.merged_at);
              return getDifferenceInHoursBetweenTwoDateTimes(
                closedAt,
                createdAt
              );
            });

            if (prDifferenceInHours && prDifferenceInHours.length > 0) {
              totalDifference += prDifferenceInHours.reduce((a, b) => a + b, 0);
              totalCount += prDifferenceInHours.length;
            }
          });

          // Calculate the average
          return totalCount === 0 ? null : totalDifference / totalCount;
        }),
      },
      ...userIds.map((userId, i) => {
        const user = users!.find((user) => user.id === userId);

        return {
          label: user?.fullName,
          color: getChartItemColor(i),
          data: sortedLabels.map((sortedLabel) => {
            const objects = pullRequestsGrouped.find(
              (pr) =>
                pr.date === sortedLabel && pr.backstage_user_id == user?.id
            )?.objects;

            if (!objects) return undefined;

            const differenceInHours = objects.map((object) => {
              const createdAt = new Date(object.created_at);
              const closedAt = new Date(object.merged_at);

              return getDifferenceInHoursBetweenTwoDateTimes(
                closedAt,
                createdAt
              );
            });

            return (
              differenceInHours.reduce((a, b) => a + b, 0) /
              differenceInHours.length
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
      title="Interval between creating and merging pull requests by user"
      chart={tasks}
    />
  );
};
export default PullRequestsCloseDurationByUserChart;
