import usePullRequestsController from "../../controllers/usePullRequestsController";
import DefaultLineChart from "@/components/Charts/DefaultLineChart";
import { groupByFieldAndInterval } from "../../../../../utils/grouping";

interface Props {
  project: Project;
  startDateFilter?: string | undefined;
  endDateFilter?: string | undefined;
  interval: string;
}

const AllPullRequestsChart = ({
  project,
  startDateFilter,
  endDateFilter,
  interval,
}: Props) => {
  const { pullRequests = [] } = usePullRequestsController(
    project,
    startDateFilter,
    endDateFilter
  );

  const pullRequestsGrouped = groupByFieldAndInterval(
    pullRequests,
    "created_at",
    interval
  );

  const sortedLabels = pullRequestsGrouped.map((pr) => pr.date).sort();

  const tasks = {
    labels: sortedLabels,
    datasets: [
      {
        label: "Pull requests",
        data: sortedLabels.map((label) => {
          return pullRequestsGrouped.find((pr) => pr.date === label)?.objects
            .length;
        }),
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
