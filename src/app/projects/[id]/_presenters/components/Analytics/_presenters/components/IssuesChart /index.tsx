import useIssuesController from "../../controllers/useIssuesController"; // Updated import
import DefaultLineChart from "@/components/Charts/DefaultLineChart";
import useUsersController from "@/app/_presenters/controllers/useUsersController";
import { getChartItemColor } from "../../utils/colors";

function getUniqueUserIds(objects) {
  if (!objects) return [];
  const userIds = new Set();

  objects.forEach((obj) => {
    userIds.add(obj.user_id); // Updated to user_id
  });

  return [...userIds];
}

function groupByUserIdAndDay(objects) {
  if (!objects) return [];

  const grouped = {};

  objects.forEach((obj) => {
    // Extract the year, month, and day (YYYY-MM-DD) from the timestamp
    const day = obj.closed_date.substring(0, 10);
    const key = `${obj.user_id}_${day}`;
    if (grouped[key]) {
      grouped[key].push(obj);
    } else {
      grouped[key] = [obj];
    }
  });

  // Convert the grouped object to the desired list format
  const resultList = [];
  for (const [key, group] of Object.entries(grouped)) {
    const [userId, day] = key.split("_");
    resultList.push({
      user_id: userId,
      date: day,
      objects: group,
    });
  }

  return resultList;
}

function getMondayOfTheWeek(dateString: string): string {
  const date = new Date(dateString);
  const day = date.getDay() || 7;
  if (day !== 1) {
    date.setHours(-24 * (day - 1));
  }
  return date.toISOString().slice(0, 10);
}

function groupByUserIdAndWeek(objects) {
  if (!objects) return [];
  const grouped = {};

  objects.forEach((obj) => {
    const monday = getMondayOfTheWeek(obj.closed_date);
    const key = `${obj.user_id}_${monday}`;

    if (grouped[key]) {
      grouped[key].push(obj);
    } else {
      grouped[key] = [obj];
    }
  });

  const resultList = [];
  for (const [key, group] of Object.entries(grouped)) {
    const [userId, mondayDate] = key.split("_");
    resultList.push({
      user_id: userId,
      date: mondayDate,
      objects: group,
    });
  }

  return resultList;
}
function groupByUserIdAndMonth(objects) {
  if (!objects) return [];
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

interface Props {
  project: Project;
  startDateFilter?: string | undefined;
  endDateFilter?: string | undefined;
  differenceType: string;
}

const AllIssuesChart = ({
  project,
  startDateFilter,
  endDateFilter,
  differenceType,
}: Props) => {
  const { issues = [], isLoading } = useIssuesController(
    project,
    startDateFilter,
    endDateFilter
  );
  const { users = [], isLoading: isLoadingUsers } = useUsersController();

  var issuesGrouped = {};
  if (differenceType === "weeks") {
    issuesGrouped = groupByUserIdAndWeek(issues);
  } else if (differenceType === "month") {
    issuesGrouped = groupByUserIdAndMonth(issues);
  } else if (differenceType === "days") {
    issuesGrouped = groupByUserIdAndDay(issues);
  }

  const sortedLabels = [
    ...new Set(issuesGrouped.map((issue) => issue.date).sort()),
  ];

  const userIds = getUniqueUserIds(issues).filter((userId) => userId);

  const tasks = {
    labels: sortedLabels,
    datasets: userIds.map((userId, i) => {
      const user = users?.find((user) => user.id === userId);

      return {
        label: user?.fullName,
        color: getChartItemColor(i),
        data: sortedLabels.map((sortedLabel) => {
          return issuesGrouped.find(
            (issue) => issue.date === sortedLabel && issue.user_id == user?.id
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
