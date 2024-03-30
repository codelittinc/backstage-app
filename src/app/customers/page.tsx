"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

import TableLayout from "@/components/LayoutContainers/TableLayout";
import routes from "@/routes";

import useCustomersController from "./_presenters/controllers/useCustomersController";

function Customers(): JSX.Element {
  const { customers = [], isLoading } = useCustomersController();
  const router = useRouter();
  const columns = [
    {
      Header: "name",
      accessor: "name",
      width: "20%",
      isSorted: true,
      Cell: ({ row }: any) => {
        const {
          original: { name, slug },
        } = row;
        return <Link href={routes.customerPath(slug)}>{name}</Link>;
      },
    },
  ];

  return (
    <TableLayout
      onClickNew={() => isThisAFunction()}
      buttonLabel="Add a customer"
      columns={columns}
      rows={customers}
      isLoading={isLoading}
      sortable={true}
    />
  );
}

export default Customers;
