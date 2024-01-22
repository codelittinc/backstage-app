import { Grid } from "@mui/material";
import Link from "next/link";

import DataTable from "@/components/DataTable";
import Loading from "@/components/Loading";

import useUserPullRequestsController from "./_presenters/controllers/useUserPullRequestsController";

function formatDate(isoDateString: string) {
  const date = new Date(isoDateString);
  const month = String(date.getMonth() + 1).padStart(2, "0"); // getMonth() returns 0-11
  const day = String(date.getDate()).padStart(2, "0");
  const year = date.getFullYear();

  return `${month}/${day}/${year}`;
}

type Props = {
  endDate: string;
  startDate: string;
};
const UserPullRequests = ({ startDate, endDate }: Props) => {
  const { pullRequests, isLoading } = useUserPullRequestsController(
    startDate,
    endDate
  );

  const columns = [
    {
      Header: "Title",
      accessor: "title",
      width: "30%",
      Cell: ({ row }: any) => {
        const {
          original: { link, title },
        } = row;

        return (
          <Link href={link} target="_blank">
            {title.substring(0, 30)}...
          </Link>
        );
      },
    },
    {
      Header: "State",
      accessor: "state",
      width: "10%",
      isSorted: true,
    },
    {
      Header: "Created at",
      accessor: "created_at",
      width: "10%",
      Cell: ({ value }: any) => {
        return formatDate(value);
      },
    },
    {
      Header: "Merged at",
      accessor: "merged_at",
      width: "10%",
      Cell: ({ value }: any) => {
        if (value) {
          return formatDate(value);
        }
        return "-";
      },
    },
    {
      Header: "Merged in hours",
      accessor: "intervalBetweenPrs",
      width: "10%",
      Cell: ({ row }: any) => {
        const { created_at, merged_at } = row.original;
        if (!merged_at) return "-";
        const createdDate = new Date(created_at);
        const mergedDate = new Date(merged_at);

        const differenceInMilliseconds =
          mergedDate.getTime() - createdDate.getTime();

        const differenceInHours = differenceInMilliseconds / 3600000;

        const formattedDifference = differenceInHours.toFixed(2);

        return formattedDifference;
      },
    },
    {
      Header: "Number of comments",
      accessor: "code_comments",
      width: "10%",
      isSorted: true,
    },
  ];

  if (isLoading) return <Loading />;

  const data = {
    columns: columns,
    rows: pullRequests,
  };

  return (
    <Grid item xs={12}>
      <DataTable table={data} canSearch isSorted entriesPerPage={false} />
    </Grid>
  );
};

export default UserPullRequests;
