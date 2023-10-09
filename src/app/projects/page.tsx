"use client";
import { useRouter } from "next/navigation";
import useProjectsController from "./_presenters/controllers/useProjectsController";
import TableLayout from "@/components/LayoutContainers/TableLayout";
import routes from "@/routes";
import Link from "next/link";

function Projects(): JSX.Element {
  const { projects = [], isLoading } = useProjectsController();
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
        return <Link href={routes.projectPath(id)}>{name}</Link>;
      },
    },
  ];

  return (
    <TableLayout
      onClickNew={() => router.push(routes.newProjectPath)}
      buttonLabel="Add a project"
      columns={columns}
      rows={projects}
      isLoading={isLoading}
    />
  );
}

export default Projects;
