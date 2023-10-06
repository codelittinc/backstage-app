"use client";
import { useRouter } from "next/navigation";
import useRepositoriesController from "./_presenters/controllers/useRepositoriesController";
import TableLayout from "@/components/LayoutContainers/TableLayout";
import routes from "@/routes";
import Link from "next/link";
import StatusCell from "@/components/DataTable/StatusCell";

function Repositories(): JSX.Element {
  const { repositories = [], isLoading } = useRepositoriesController();
  const router = useRouter();

  const columns = [
    {
      Header: "name",
      accessor: "name",
      width: "20%",
      Cell: ({ row }: any) => {
        const {
          original: { name, id },
        } = row;
        return <Link href={routes.repositoryPath(id)}>{name}</Link>;
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
  return (
    <TableLayout
      isLoading={isLoading}
      buttonLabel="Add a repository"
      onClickNew={() => router.push(routes.newRepositoryPath)}
      columns={columns}
      rows={repositories}
    />
  );
}

export default Repositories;
