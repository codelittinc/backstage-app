import useIssuesController from "../../controllers/useIssuesController";
import DefaultLineChart from "@/components/Charts/DefaultLineChart";
import useUsersController from "@/app/_presenters/controllers/useUsersController";
import { getChartItemColor } from "../../../../../utils/colors";
import { groupByFieldAndInterval } from "../../../../../utils/grouping";

function getUniqueUserIds(objects) {
  if (!objects) return [];
  const userIds = new Set();

  objects.forEach((obj) => {
    userIds.add(obj.user_id); // Updated to user_id
  });

  return [...userIds];
}

interface Props {
  project: Project;
  startDateFilter?: string | undefined;
  endDateFilter?: string | undefined;
  interval: string;
}

const IssuesChart = ({
  project,
  startDateFilter,
  endDateFilter,
  interval,
}: Props) => {
  const { issues = [], isLoading } = useIssuesController(
    project,
    startDateFilter,
    endDateFilter
  );
  var issuesGrouped = groupByFieldAndInterval(issues, "closed_date", interval);

  const sortedLabels = issuesGrouped.map((issue) => issue.date).sort();

  const tasks = {
    labels: sortedLabels,
    datasets: [
      {
        label: "Effort",
        data: sortedLabels.map((label) => {
          return (
            issuesGrouped
              .find((pr) => pr.date === label)
              .objects.reduce((sum, item) => sum + item.effort, 0) || undefined
          );
        }),
      },
    ],
  };

  return (
    <DefaultLineChart
      icon={{ component: "insights" }}
      title="Total effort of completed issues"
      chart={tasks}
    />
  );
};

export default IssuesChart; // Updated export
