"use client";
import Link from "next/link";

import useUsersController from "@/app/_presenters/controllers/useUsersController";
import { formatDateToMonthDayYear } from "@/app/_presenters/utils/date";
import DataTable from "@/components/DataTable";
import TableLayout from "@/components/LayoutContainers/TableLayout";
import Loading from "@/components/Loading";
import routes from "@/routes";

import usePullRequestsController from "../../controllers/usePullRequestsController";

interface Props {
  endDateFilter: string;
  project: Project;
  startDateFilter: string;
}

function PullRequestsTable({
  endDateFilter,
  project,
  startDateFilter,
}: Props): JSX.Element {
  const { users, isLoading: isUsersLoading } = useUsersController();

  const { pullRequests = [], isLoading: isPullRequestsLoading } =
    usePullRequestsController(
      startDateFilter,
      endDateFilter,
      project,
      undefined,
      "open"
    );

  if (isUsersLoading || isPullRequestsLoading) return <Loading />;

  const columns = [
    {
      Header: "User name",
      accessor: "backstage_user_id",
      width: "20%",
      Cell: ({ value }: number) => {
        const user = users!.find((user) => user.id === value);
        const { slug, fullName } = user!;

        return <Link href={routes.userPath(slug)}>{fullName}</Link>;
      },
    },
    {
      Header: "Title",
      accessor: "title",
      width: "20%",
      Cell: ({ row }: any) => {
        const {
          original: { title, link },
        } = row;
        return <Link href={link}>{title}</Link>;
      },
    },
    {
      Header: "Days old",
      accessor: "_",
      width: "20%",
      Cell: ({ row }: any) => {
        const {
          original: { created_at },
        } = row;
        const date1 = new Date(created_at);
        const date2 = new Date();
        const diffTime = Math.abs(date2.getTime() - date1.getTime());
        return Math.round(diffTime / (1000 * 60 * 60 * 24));
      },
    },
    {
      Header: "Days old",
      accessor: "created_at",
      width: "20%",
      Cell: ({ value }: any) => {
        return formatDateToMonthDayYear(value);
      },
    },
    {
      Header: "Status",
      accessor: "state",
      width: "20%",
    },
    {
      Header: "Reviews",
      accessor: "reviews",
      width: "20%",
      Cell: ({ value }: any) => {
        return value.length;
      },
    },
    {
      Header: "Code comments",
      accessor: "code_comments",
      width: "20%",
    },
  ];

  const data = {
    columns,
    rows: pullRequests.sort(
      (a, b) =>
        new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
    ),
  };

  return (
    <DataTable table={data} entriesPerPage={false} canSearch isSorted={true} />
  );
}

export default PullRequestsTable;
