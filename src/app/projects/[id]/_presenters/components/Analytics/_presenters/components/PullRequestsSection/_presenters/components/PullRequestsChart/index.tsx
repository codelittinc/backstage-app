import usePullRequestsController from "../../controllers/usePullRequestsController";
import DefaultLineChart from "@/components/Charts/DefaultLineChart";
import { groupByFieldAndInterval } from "../../../../../utils/grouping";
import Loading from "@/components/Loading";

interface Props {
  endDateFilter?: string | undefined;
  interval: string;
  project: Project;
  startDateFilter?: string | undefined;
}

const AllPullRequestsChart = ({
  project,
  startDateFilter,
  endDateFilter,
  interval,
}: Props) => {
  const { pullRequests = [], isLoading } = usePullRequestsController(
    project,
    startDateFilter,
    endDateFilter
  );

  if (isLoading) {
    return <Loading partial height="19.125rem" />;
  }

  const pullRequestsGrouped = groupByFieldAndInterval(
    pullRequests,
    "merged_at",
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
      title="Merged pull requests"
      chart={tasks}
    />
  );
};
export default AllPullRequestsChart;
