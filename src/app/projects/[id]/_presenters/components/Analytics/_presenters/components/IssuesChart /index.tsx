import useIssuesController from "../../controllers/useIssuesController"; // Updated import
import DefaultLineChart from "@/components/Charts/DefaultLineChart";
import useUsersController from "@/app/_presenters/controllers/useUsersController";

function getUniqueUserIds(objects) {
  const userIds = new Set();

  objects.forEach((obj) => {
    userIds.add(obj.user_id); // Updated to user_id
  });

  return [...userIds];
}

function groupByUserIdAndMonth(objects) {
  const grouped = {};

  objects.forEach((obj) => {
    // Extract the year and month (YYYY-MM) from the timestamp
    const monthYear = obj.closed_date.substring(0, 7);
    const key = `${obj.user_id}_${monthYear}`;
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
      user_id: userId,
      date: monthYear,
      objects: group,
    });
  }

  return resultList;
}

const AllIssuesChart = ({ project }: { project: Project }) => {
  // Updated function name
  const { issues, isLoading } = useIssuesController(project); // Updated variable names
  const { users, isLoading: isLoadingUsers } = useUsersController();
  if (isLoading || isLoadingUsers) return <div>Loading...</div>;

  const issuesGrouped = groupByUserIdAndMonth(issues); // Updated variable names
  const sortedLabels = [
    ...new Set(issuesGrouped.map((issue) => issue.date).sort()), // Updated variable name
  ];

  const userIds = getUniqueUserIds(issues).filter(
    // Updated function call
    (userId) => userId
  );

  const colors = [
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "light",
    "dark",
  ];

  const tasks = {
    labels: sortedLabels,
    datasets: userIds.map((userId, i) => {
      const user = users!.find((user) => user.id === userId);

      return {
        label: user.fullName,
        color: colors[i],
        data: sortedLabels.map((sortedLabel) => {
          return issuesGrouped.find(
            (issue) => issue.date === sortedLabel && issue.user_id == user.id
          )?.objects.length;
        }),
      };
    }),
  };

  return (
    <DefaultLineChart
      icon={{ component: "insights" }}
      title="Issues per user" // Updated title
      chart={tasks}
    />
  );
};
export default AllIssuesChart; // Updated export
