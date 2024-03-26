"use client";
import useUsersController from "@/app/_presenters/controllers/useUsersController";
import { formatDateToMonthDayYear } from "@/app/_presenters/utils/date";
import { truncate } from "@/app/_presenters/utils/string";
import DataTable from "@/components/DataTable";
import useIssuesController from "../../controllers/useIssuesController";

interface Props {
  endDateFilter?: string;
  project: Project;
  startDateFilter?: string;
}

function IssuesTable({
  endDateFilter,
  project,
  startDateFilter,
}: Props): JSX.Element {
  const { issues = [] } = useIssuesController(
    project,
    startDateFilter,
    endDateFilter,
    false
  );

  const columns = [
    {
      Header: "Title",
      accessor: "title",
      width: "20%",
      Cell: ({ value }: number) => {
        return truncate(value, 50);
      },
    },
    {
      Header: "Type",
      accessor: "issueType",
      width: "10%",
    },
    {
      Header: "State",
      accessor: "state",
      width: "10%",
    },
    {
      Header: "Reported at",
      accessor: "reportedAt",
      width: "10%",
      Cell: ({ value }: any) => {
        return formatDateToMonthDayYear(value);
      },
    },
    {
      Header: "Completed at",
      accessor: "closedDate",
      width: "10%",
      Cell: ({ value }: any) => {
        return formatDateToMonthDayYear(value);
      },
    },
    {
      Header: "Identifier",
      accessor: "ttsId",
      width: "10%",
    },
  ];

  const data = {
    columns,
    rows: issues.sort(
      (a, b) =>
        new Date(a.reportedAt).getTime() - new Date(b.reportedAt).getTime()
    ),
  };

  return <DataTable table={data} canSearch={true} isSorted={true} />;
}

export default IssuesTable;
