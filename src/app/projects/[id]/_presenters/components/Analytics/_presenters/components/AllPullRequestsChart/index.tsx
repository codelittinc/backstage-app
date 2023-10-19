import usePullRequestsController from "../../controllers/usePullRequestsController";
import DefaultLineChart from "@/components/Charts/DefaultLineChart";

function groupByMonth(objects) {
  if (!objects) return [];
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
  const { pullRequests } = usePullRequestsController(
    project,
    startDateFilter,
    endDateFilter
  );

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
      title="Pull requests"
      chart={tasks}
    />
  );
};
export default AllPullRequestsChart;
