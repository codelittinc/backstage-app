import DefaultLineChart from "@/components/Charts/DefaultLineChart";
import Loading from "@/components/Loading";

import { groupByFieldAndInterval } from "../../../../../utils/grouping";
import useIssuesController from "../../controllers/useIssuesController";

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

  if (isLoading) {
    return <Loading partial height="19.125rem" />;
  }

  const bugs = issues.filter((issue) => issue.issueType === "Bug");
  const bugsGrouped = groupByFieldAndInterval(bugs, "closedDate", interval);

  const nonBugs = issues.filter((issue) => issue.issueType !== "Bug");
  const nonBugsGrouped = groupByFieldAndInterval(
    nonBugs,
    "closedDate",
    interval
  );

  const sortedLabels = nonBugsGrouped.map((issue) => issue.date).sort();

  const tasks = {
    labels: sortedLabels,
    datasets: [
      {
        label: "Tasks",
        data: sortedLabels.map((label) => {
          return nonBugsGrouped.find((pr) => pr.date === label)?.objects.length;
        }),
        color: "info",
      },
      {
        label: "Bugs",
        data: sortedLabels.map((label) => {
          return bugsGrouped.find((pr) => pr.date === label)?.objects.length;
        }),
        color: "primary",
      },
    ],
  };

  return (
    <DefaultLineChart
      icon={{ component: "insights" }}
      title="Completed tasks"
      chart={tasks}
    />
  );
};

export default IssuesChart; // Updated export
