"use client";
import DataTable from "@/components/DataTable";
import StatusCell from "@/components/DataTable/StatusCell";
import Link from "next/link";
import routes from "@/routes";

interface Props {
  customers: Customer[];
}

function CustomersTable({ customers }: Props): JSX.Element {
  const columns = [
    {
      Header: "name",
      accessor: "name",
      width: "20%",
      Cell: ({ row }: any) => {
        const {
          original: { name, id },
        } = row;
        return <Link href={routes.customer_path(id)}>{name}</Link>;
      },
    },
  ];

  const data = {
    columns: columns,
    rows: customers,
  };

  return <DataTable table={data} entriesPerPage={false} canSearch />;
}

export default CustomersTable;
