import usePullRequestsController from "../../controllers/usePullRequestsController";
import DefaultLineChart from "@/components/Charts/DefaultLineChart";
import useUsersController from "@/app/_presenters/controllers/useUsersController";
import { getChartItemColor } from "../../utils/colors";

function getUniqueBackstageUserIds(objects) {
  const userIds = new Set();

  objects.forEach((obj) => {
    userIds.add(obj.backstage_user_id);
  });

  return [...userIds];
}

function groupByUserIdAndMonth(objects) {
  const grouped = {};

  objects.forEach((obj) => {
    // Extract the year and month (YYYY-MM) from the timestamp
    const monthYear = obj.created_at.substring(0, 7);
    const key = `${obj.backstage_user_id}_${monthYear}`;
    if (grouped[key]) {
      grouped[key].push(obj);
    } else {
      grouped[key] = [obj];
    }
  });

  // Convert the grouped object to the desired list format
  const resultList = [];
  for (const [key, group] of Object.entries(grouped)) {
    const [userId, monthYear] = key.split("_");
    resultList.push({
      backstage_user_id: userId,
      date: monthYear,
      objects: group,
    });
  }

  return resultList;
}

interface Props {
  project: Project;
  startDateFilter?: string | undefined;
  endDateFilter?: string | undefined;
}

const AllPullRequestsChart = ({
  project,
  startDateFilter,
  endDateFilter,
}: Props) => {
  const { pullRequests = [] } = usePullRequestsController(
    project,
    startDateFilter,
    endDateFilter
  );
  const { users = [] } = useUsersController();

  const pullRequestsGrouped = groupByUserIdAndMonth(pullRequests);
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
          return pullRequestsGrouped.find(
            (pr) => pr.date === sortedLabel && pr.backstage_user_id == user?.id
          )?.objects.length;
        }),
      };
    }),
  };

  return (
    <DefaultLineChart
      icon={{ component: "insights" }}
      title="Pull request per user"
      chart={tasks}
    />
  );
};
export default AllPullRequestsChart;
