import useIssuesController from "../../controllers/useIssuesController";
import DefaultLineChart from "@/components/Charts/DefaultLineChart";
import useUsersController from "@/app/_presenters/controllers/useUsersController";
import { getChartItemColor } from "../../../../../utils/colors";
import { groupByFieldAndInterval } from "../../../../../utils/grouping";

function getUniqueUserIds(objects) {
  const userIds = new Set();

  objects.forEach((obj) => {
    userIds.add(obj.user_id);
  });

  return [...userIds];
}

interface Props {
  project: Project;
  startDateFilter?: string | undefined;
  endDateFilter?: string | undefined;
  interval: string;
}

const IssuesEffortChart = ({
  project,
  startDateFilter,
  endDateFilter,
  interval,
}: Props) => {
  const { issues = [] } = useIssuesController(
    project,
    startDateFilter,
    endDateFilter
  );
  const { users = [] } = useUsersController();

  const issuesGrouped = groupByFieldAndInterval(
    issues,
    "closed_date",
    interval,
    "user_id"
  );

  const sortedLabels = [
    ...new Set(issuesGrouped.map((issue) => issue.date).sort()),
  ];

  const userIds = getUniqueUserIds(issues).filter((userId) => userId);

  const tasks = {
    labels: sortedLabels,
    datasets: userIds.map((userId, i) => {
      const user = users!.find((user) => user.id === userId);

      return {
        label: user?.fullName,
        color: getChartItemColor(i),
        data: sortedLabels.map((sortedLabel) => {
          const objects = issuesGrouped.find(
            (issue) => issue.date === sortedLabel && issue.user_id == user?.id
          )?.objects;
          return objects?.reduce((sum, item) => sum + item.effort, 0) || 0;
        }),
      };
    }),
  };

  return (
    <DefaultLineChart
      icon={{ component: "insights" }}
      title="Effort per user"
      chart={tasks}
    />
  );
};
export default IssuesEffortChart;
