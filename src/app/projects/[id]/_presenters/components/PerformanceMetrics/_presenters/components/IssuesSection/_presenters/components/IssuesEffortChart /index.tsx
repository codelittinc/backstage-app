import useUsersController from "@/app/_presenters/controllers/useUsersController";
import DefaultLineChart from "@/components/Charts/DefaultLineChart";
import Loading from "@/components/Loading";

import { getChartItemColor } from "../../../../../utils/colors";
import { groupByFieldAndInterval } from "../../../../../utils/grouping";
import useIssuesController from "../../controllers/useIssuesController";
import { getUniqueUserIds } from "../../../../PullRequestsSection/_presenters/utils/issues";

interface Props {
  endDateFilter?: string | undefined;
  interval: string;
  project: Project;
  startDateFilter?: string | undefined;
}

const IssuesEffortChart = ({
  project,
  startDateFilter,
  endDateFilter,
  interval,
}: Props) => {
  const { issues = [], isLoading } = useIssuesController(
    project,
    startDateFilter,
    endDateFilter,
    true
  );
  const { users = [], isLoading: isUsersLoading } = useUsersController();

  if (isLoading || isUsersLoading) {
    return <Loading partial height="19.125rem" />;
  }

  const issuesGrouped = groupByFieldAndInterval(
    issues,
    "closedDate",
    interval,
    "userId"
  );

  const sortedLabels = [
    ...new Set(issuesGrouped.map((issue) => issue.date).sort()),
  ];

  const userIds = getUniqueUserIds(issues).filter((userId) => userId);

  const tasks = {
    labels: sortedLabels,
    datasets: [
      {
        label: "Average",
        color: "black",
        data: sortedLabels.map((sortedLabel) => {
          const allObjectsForDate = issuesGrouped.filter(
            (issue) => issue.date === sortedLabel
          );

          let totalEffort = 0;
          let totalCount = 0;
          allObjectsForDate.forEach((issue) => {
            const effortForUser =
              issue.objects?.reduce((sum, item) => sum + item.effort, 0) || 0;
            totalEffort += effortForUser;
            if (effortForUser !== 0) {
              totalCount++;
            }
          });

          return totalCount === 0 ? null : totalEffort / totalCount;
        }),
      },
      {
        label: "Median",
        color: "grey",
        data: sortedLabels.map((sortedLabel) => {
          const allEffortsForDate = issuesGrouped
            .filter((issue) => issue.date === sortedLabel)
            .map(
              (issue) =>
                issue.objects?.reduce((sum, item) => sum + item.effort, 0) || 0
            )
            .sort((a, b) => a - b); // Sort the efforts

          const middleIndex = Math.floor(allEffortsForDate.length / 2);
          if (allEffortsForDate.length % 2 === 0) {
            // Even number of efforts
            return (
              (allEffortsForDate[middleIndex - 1] +
                allEffortsForDate[middleIndex]) /
              2
            );
          } else {
            // Odd number of efforts
            return allEffortsForDate[middleIndex];
          }
        }),
      },
      ...userIds.map((userId, i) => {
        const user = users!.find((user) => user.id === userId);

        return {
          label: user?.fullName,
          color: getChartItemColor(i),
          data: sortedLabels.map((sortedLabel) => {
            const objects = issuesGrouped.find(
              (issue) => issue.date === sortedLabel && issue.userId == user?.id
            )?.objects;
            return objects?.reduce((sum, item) => sum + item.effort, 0) || null;
          }),
        };
      }),
      // Adding the median dataset
    ],
  };

  return (
    <DefaultLineChart
      icon={{ component: "insights" }}
      title="Effort of user's completed tasks"
      chart={tasks}
    />
  );
};
export default IssuesEffortChart;
