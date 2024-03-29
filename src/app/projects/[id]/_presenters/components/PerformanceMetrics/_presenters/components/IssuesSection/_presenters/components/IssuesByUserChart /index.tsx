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

const IssuesChart = ({
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

  var issuesGrouped = groupByFieldAndInterval(
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

          let totalLength = 0;
          let totalCount = 0;
          allObjectsForDate.forEach((issue) => {
            const lengthForUser = issue.objects?.length || 0;
            totalLength += lengthForUser;
            if (lengthForUser !== 0) {
              totalCount++;
            }
          });

          return totalCount === 0 ? null : totalLength / totalCount;
        }),
      },
      // Adding the median dataset
      {
        label: "Median",
        color: "grey",
        data: sortedLabels.map((sortedLabel) => {
          const allLengthsForDate = issuesGrouped
            .filter((issue) => issue.date === sortedLabel)
            .map((issue) => issue.objects?.length || 0)
            .sort((a, b) => a - b); // Sort the lengths

          const middleIndex = Math.floor(allLengthsForDate.length / 2);
          if (allLengthsForDate.length % 2 === 0) {
            // Even number of lengths
            return (
              (allLengthsForDate[middleIndex - 1] +
                allLengthsForDate[middleIndex]) /
              2
            );
          } else {
            // Odd number of lengths
            return allLengthsForDate[middleIndex];
          }
        }),
      },
      ...userIds.map((userId, i) => {
        const user = users?.find((user) => user.id === userId);

        return {
          label: user?.fullName,
          color: getChartItemColor(i),
          data: sortedLabels.map((sortedLabel) => {
            return (
              issuesGrouped.find(
                (issue) =>
                  issue.date === sortedLabel && issue.userId == user?.id
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
      title="User's completed tasks" // Updated title
      chart={tasks}
    />
  );
};

export default IssuesChart; // Updated export
