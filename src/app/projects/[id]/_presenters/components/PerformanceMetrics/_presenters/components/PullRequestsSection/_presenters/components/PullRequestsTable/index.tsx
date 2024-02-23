"use client";
import { Icon } from "@mui/material";
import Link from "next/link";

import useUsersController from "@/app/_presenters/controllers/useUsersController";
import { formatDateToMonthDayYear } from "@/app/_presenters/utils/date";
import { truncate } from "@/app/_presenters/utils/string";
import DataTable from "@/components/DataTable";
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

  const columns = [
    {
      Header: "User name",
      accessor: "backstage_user_id",
      width: "20%",
      Cell: ({ value }: number) => {
        const user = users.find((user) => user.id === value);
        if (!user) return "User not found on Backstage.";
        const { slug, fullName } = user;

        return (
          <Link href={routes.userPath(slug)}>{truncate(fullName, 20)}</Link>
        );
      },
    },
    {
      Header: "Title",
      accessor: "title",
      width: "50%",
      Cell: ({ row }: any) => {
        const {
          original: { title, link },
        } = row;
        return <Link href={link}>{truncate(title, 80)}</Link>;
      },
    },
    {
      Header: "Reviewed",
      accessor: "reviews",
      width: "10%",
      Cell: ({ value }: any) => {
        const reviewed = value.length > 0;
        const icon = reviewed ? "check_circle" : "cancel";
        const color = reviewed ? "success" : "error";

        return <Icon color={color}>{icon}</Icon>;
      },
    },
    {
      Header: "Days old",
      accessor: "_",
      width: "10%",
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
      Header: "Code comments",
      accessor: "code_comments",
      width: "10%",
    },
    {
      Header: "Created at",
      accessor: "created_at",
      width: "10%",
      Cell: ({ value }: any) => {
        return formatDateToMonthDayYear(value);
      },
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
    <DataTable
      table={data}
      entriesPerPage={false}
      canSearch={false}
      isSorted={true}
    />
  );
}

export default PullRequestsTable;
