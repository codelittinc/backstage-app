"use client";
import DataTable from "@/components/DataTable";
import StatusCell from "@/components/DataTable/StatusCell";
import Link from "next/link";
import routes from "@/routes";
import { Repository } from "@/app/repositories/_domain/interfaces/Repository";

interface Props {
  repositories: Repository[];
}

function Repositories({ repositories }: Props): JSX.Element {
  const columns = [
    {
      Header: "name",
      accessor: "name",
      width: "20%",
      Cell: ({ row }: any) => {
        const {
          original: { name, id },
        } = row;
        return <Link href={routes.repository_path(id)}>{name}</Link>;
      },
    },
    { Header: "owner", accessor: "owner", width: "20%" },
    {
      Header: "active",
      accessor: "active",
      width: "20%",
      Cell: ({ value }: any) => {
        let status;
        if (value) {
          status = <StatusCell icon="done" color="success" status="active" />;
        } else {
          status = <StatusCell icon="close" color="error" status="inactive" />;
        }
        return status;
      },
    },
  ];

  const data = {
    columns: columns,
    rows: repositories,
  };

  return <DataTable table={data} entriesPerPage={false} canSearch />;
}

export default Repositories;
