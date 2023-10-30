"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

import TableLayout from "@/components/LayoutContainers/TableLayout";
import routes from "@/routes";

import useProjectsController from "./_presenters/controllers/useProjectsController";

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
          original: { name, slug },
        } = row;
        return <Link href={routes.projectPath(slug)}>{name}</Link>;
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
