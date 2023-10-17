"use client";
import { useRouter } from "next/navigation";
import TableLayout from "@/components/LayoutContainers/TableLayout";
import routes from "@/routes";
import Link from "next/link";
import useUsersController from "../_presenters/controllers/useUsersController";

function Users(): JSX.Element {
  const { users = [], isLoading } = useUsersController();
  const columns = [
    {
      Header: "Name",
      accessor: "fullName",
      width: "20%",
      Cell: ({ row }: any) => {
        const {
          original: { fullName, id },
        } = row;
        return <Link href={routes.userPath(id)}>{fullName}</Link>;
      },
    },
    {
      Header: "Email",
      accessor: "email",
      width: "20%",
    },
    {
      Header: "Profession",
      accessor: "profession",
      width: "20%",
      Cell: ({ row }: any) => {
        const {
          original: { profession, id },
        } = row;

        return <>{profession?.name}</>;
      },
    },
  ];

  return <TableLayout columns={columns} rows={users} isLoading={isLoading} />;
}

export default Users;
