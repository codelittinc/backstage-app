import Icon from "@mui/material/Icon";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

import { StatementOfWork } from "@/app/_domain/interfaces/StatementOfWork";
import { toUSD } from "@/app/_presenters/utils/finances";
import Button from "@/components/Button";
import DataTable from "@/components/DataTable";
import Loading from "@/components/Loading";
import routes from "@/routes";

import useStatementsOfWorkController from "../../controllers/useStatementsOfWorkController";

function formatDateToMonthDayYear(isoDate: string): string {
  const date = new Date(isoDate);
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-indexed
  const day = date.getDate().toString().padStart(2, "0");
  const year = date.getFullYear();

  return `${month}/${day}/${year}`;
}
interface Props {
  project: Project;
}

const StatmentsOfWorkTable: React.FC<Props> = ({ project }) => {
  const router = useRouter();

  const { statementsOfWork, isLoading, onDelete, projects } =
    useStatementsOfWorkController(project.id!);

  if (isLoading) {
    return <Loading />;
  }

  const columns = [
    {
      Header: "Name",
      accessor: "name",
      width: "30%",
      Cell: ({
        value,
        row,
      }: {
        row: { original: StatementOfWork };
        value: string;
      }) => {
        const {
          original: { id, projectId },
        } = row;

        return (
          <Link href={routes.statementOfWorkPath(id!, projectId)}>{value}</Link>
        );
      },
    },
    {
      Header: "Period",
      accessor: "startDate",
      width: "30%",
      Cell: ({ row }: any) => {
        const statementOfWork = row.original;

        return `${formatDateToMonthDayYear(
          statementOfWork.startDate
        )} - ${formatDateToMonthDayYear(statementOfWork.endDate)}`;
      },
    },
    {
      Header: "Contract size",
      accessor: "totalRevenue",
      width: "30%",
      Cell: ({ value }: { value: number }) => {
        return toUSD(value);
      },
    },
    {
      Header: "",
      accessor: "edit",
      width: "5%",
      Cell: ({ row }: any) => {
        const {
          original: { id, projectId },
        } = row;

        const projectSlug = projects.find(
          (project: Project) => project.id === projectId
        ).slug;

        return (
          <Button
            variant="text"
            color="info"
            onClick={() => {
              router.push(routes.statementOfWorkPath(id, projectSlug));
            }}
          >
            <Icon>edit</Icon>
          </Button>
        );
      },
    },
    {
      Header: "",
      accessor: "delete",
      width: "5%",
      Cell: ({ row }: any) => {
        const { original } = row;
        return (
          <Button
            variant="text"
            color="error"
            onClick={() => onDelete(original)}
          >
            <Icon>delete</Icon>
          </Button>
        );
      },
    },
  ];

  const data = {
    columns: columns,
    rows: statementsOfWork,
  };

  if (statementsOfWork.length == 0) {
    return <></>;
  }

  return (
    <DataTable
      table={data}
      entriesPerPage={false}
      isSorted={false}
      showTotalEntries={false}
    />
  );
};

export default StatmentsOfWorkTable;
