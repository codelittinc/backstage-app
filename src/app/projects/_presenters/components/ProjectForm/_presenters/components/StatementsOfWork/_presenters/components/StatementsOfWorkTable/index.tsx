import React from "react";
import DataTable from "@/components/DataTable";
import Button from "@/components/Button";
import Icon from "@mui/material/Icon";
import useStatementsOfWorkController from "../../controllers/useStatementsOfWorkController";
import routes from "@/routes";
import { useRouter } from "next/navigation";
import Loading from "@/components/Loading";

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
  const { statementsOfWork, isLoading, onDelete, projects } =
    useStatementsOfWorkController(project.id!);
  const router = useRouter();

  if (isLoading) {
    return <Loading />;
  }

  const columns = [
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
      Header: "",
      accessor: "edit",
      width: "5%",
      Cell: ({ row }: any) => {
        const {
          original: { id, projectId },
        } = row;
        const projectSlug = projects.find(
          (project) => project.id === projectId
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
