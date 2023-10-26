import React from "react";
import DataTable from "@/components/DataTable";
import Button from "@/components/Button";
import Icon from "@mui/material/Icon";
import useStatementsOfWorkController from "../../controllers/statementsOfWorkController";
import routes from "@/routes";
import { useRouter } from "next/navigation";

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
  const { statementsOfWork, isLoading, onDelete } =
    useStatementsOfWorkController(project.id!);
  const router = useRouter();

  if (isLoading) {
    return <></>;
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
          original: { id },
        } = row;
        return (
          <Button
            variant="text"
            color="info"
            onClick={() => {
              router.push(routes.statementOfWorkPath(id));
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
