import ReportsLineChart from "@/components/Charts/ReportsLineChart";
import { Grid } from "@mui/material";
import Box from "@/components/Box";
import usePullRequestsController from "../../controllers/usePullRequestsController";
import DefaultLineChart from "@/components/Charts/DefaultLineChart";

function groupByDay(objects) {
  const grouped = {};

  objects.forEach((obj) => {
    const day = obj.created_at.split("T")[0]; // Extract the date (YYYY-MM-DD) from the timestamp
    if (grouped[day]) {
      grouped[day]++;
    } else {
      grouped[day] = 1;
    }
  });

  const resultList = [];
  for (const [day, count] of Object.entries(grouped)) {
    resultList.push({ date: day, count: count });
  }

  return resultList;
}

function groupByMonth(objects) {
  const grouped = {};

  objects.forEach((obj) => {
    const month = obj.created_at.substring(0, 7);
    if (grouped[month]) {
      grouped[month]++;
    } else {
      grouped[month] = 1;
    }
  });

  const resultList = [];
  for (const [month, count] of Object.entries(grouped)) {
    resultList.push({ date: month, count: count });
  }

  return resultList;
}

const AllPullRequestsChart = ({ project }: { project: Project }) => {
  const { pullRequests, isLoading } = usePullRequestsController(project);
  if (isLoading) return <div>Loading...</div>;

  const pullRequestsGrouped = groupByMonth(pullRequests);
  const sortedLabels = pullRequestsGrouped.map((pr) => pr.date).sort();

  const tasks = {
    labels: sortedLabels,
    datasets: [
      {
        label: "Pull requests",
        data: sortedLabels.map(
          (label) => pullRequestsGrouped.find((pr) => pr.date === label)?.count
        ),
      },
    ],
  };

  return (
    <DefaultLineChart
      icon={{ component: "insights" }}
      title="Pull requests on all repositories"
      chart={tasks}
    />
  );
};
export default AllPullRequestsChart;
