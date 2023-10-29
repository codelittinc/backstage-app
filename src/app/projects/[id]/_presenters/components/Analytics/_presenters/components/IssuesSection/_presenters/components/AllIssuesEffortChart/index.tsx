import useIssuesController from "../../controllers/useIssuesController";
import DefaultLineChart from "@/components/Charts/DefaultLineChart";
import { groupByFieldAndInterval } from "../../../../../utils/grouping";
import Loading from "@/components/Loading";

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

  if (isLoading) {
    return <Loading partial height="19.125rem" />;
  }

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
