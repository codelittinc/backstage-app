import usePullRequestsController from "../../controllers/usePullRequestsController";
import DefaultLineChart from "@/components/Charts/DefaultLineChart";
import useUsersController from "@/app/_presenters/controllers/useUsersController";
import { getChartItemColor } from "../../../../../utils/colors";
import { groupByFieldAndInterval } from "../../../../../utils/grouping";
import getDifferenceInHoursBetweenTwoDateTimes from "./_presenters/utils/getDifferenceInHoursBetweenTwoDateTimes";

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

const PullRequestsCloseDurationByUserChart = ({
  project,
  startDateFilter,
  endDateFilter,
  interval,
}: Props) => {
  const { pullRequests = [] } = usePullRequestsController(
    project,
    startDateFilter,
    endDateFilter
  );
  const { users = [] } = useUsersController();

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
    datasets: userIds.map((userId, i) => {
      const user = users!.find((user) => user.id === userId);

      return {
        label: user?.fullName,
        color: getChartItemColor(i),
        data: sortedLabels.map((sortedLabel) => {
          const objects = pullRequestsGrouped.find(
            (pr) => pr.date === sortedLabel && pr.backstage_user_id == user?.id
          )?.objects;

          if (!objects) return undefined;

          const differenceInHours = objects.map((object) => {
            const createdAt = new Date(object.created_at);
            const closedAt = new Date(object.merged_at);

            return getDifferenceInHoursBetweenTwoDateTimes(closedAt, createdAt);
          });

          return (
            differenceInHours.reduce((a, b) => a + b, 0) /
            differenceInHours.length
          );
        }),
      };
    }),
  };

  return (
    <DefaultLineChart
      icon={{ component: "insights" }}
      title="Pull requests close duration by user"
      chart={tasks}
    />
  );
};
export default PullRequestsCloseDurationByUserChart;
