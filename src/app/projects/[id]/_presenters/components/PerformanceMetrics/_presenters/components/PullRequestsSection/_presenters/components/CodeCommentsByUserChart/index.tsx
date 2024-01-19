import useUsersController from "@/app/_presenters/controllers/useUsersController";
import DefaultLineChart from "@/components/Charts/DefaultLineChart";
import Loading from "@/components/Loading";

import { getChartItemColor } from "../../../../../utils/colors";
import { groupByFieldAndInterval } from "../../../../../utils/grouping";
import useCodeCommentsController from "../../controllers/useCodeCommentsController"; // Updated controller

function getUniqueBackstageUserIds(objects) {
  const userIds = new Set();

  objects.forEach((obj) => {
    userIds.add(obj.pull_request_owner); // Changed to pull_request_owner
  });

  return [...userIds];
}

interface Props {
  endDateFilter: string;
  interval: string;
  project: Project;
  startDateFilter: string;
}

const CodeCommentsByUserChart = ({
  project,
  startDateFilter,
  endDateFilter,
  interval,
}: Props) => {
  // Updated to useCodeCommentsController
  const { codeComments = [], isLoading } = useCodeCommentsController(
    project,
    startDateFilter,
    endDateFilter
  );

  // Filtering and data processing for code comments
  const { users = [], isLoading: isUsersLoading } = useUsersController();

  if (isLoading || isUsersLoading) {
    return <Loading partial height="19.125rem" />;
  }

  // Grouping code comments
  const codeCommentsGrouped = groupByFieldAndInterval(
    codeComments,
    "published_at",
    interval,
    "pull_request_owner" // Updated field
  );
  const sortedLabels = [
    ...new Set(codeCommentsGrouped.map((comment) => comment.date).sort()),
  ];

  const userIds = getUniqueBackstageUserIds(codeComments).filter(
    (userId) => userId
  );

  const tasks = {
    labels: sortedLabels,
    datasets: [
      {
        label: "Average",
        color: "black",
        data: sortedLabels.map((sortedLabel) => {
          // Find all code comments for the specific date for all users
          const commentCountsForDate = userIds.map((userId) => {
            return (
              codeCommentsGrouped.find(
                (comment) =>
                  comment.date === sortedLabel &&
                  comment.pull_request_owner == userId
              )?.objects.length || null
            );
          });

          // Calculate the total and average
          const totalComments = commentCountsForDate.reduce(
            (sum, count) => sum + count,
            0
          );
          const averageComments = totalComments / userIds.length;

          return averageComments;
        }),
      },
      ...userIds.map((userId, i) => {
        const user = users!.find((user) => user.id === userId);

        return {
          label: user?.fullName,
          color: getChartItemColor(i),
          data: sortedLabels.map((sortedLabel) => {
            return (
              codeCommentsGrouped.find(
                (comment) =>
                  comment.date === sortedLabel &&
                  comment.pull_request_owner == user?.id
              )?.objects.length || 0
            );
          }),
        };
      }),
    ],
  };

  return (
    <DefaultLineChart
      icon={{ component: "insights" }}
      title="Code comments from users"
      chart={tasks}
    />
  );
};

export default CodeCommentsByUserChart;
