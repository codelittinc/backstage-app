import { Box } from "@mui/material";
import Icon from "@mui/material/Icon";
import Link from "next/link";
import React from "react";

import { StatementOfWork } from "@/app/_domain/interfaces/StatementOfWork";
import { toUSD } from "@/app/_presenters/utils/finances";
import Button from "@/components/Button";
import DataTable from "@/components/DataTable";
import Loading from "@/components/Loading";
import routes from "@/routes";

import useStatementsOfWorkController from "../../controllers/useStatementsOfWorkController";
import { formatDateToMonthDayYear } from "@/app/_presenters/utils/date";

interface Props {
  project: Project;
}

const StatmentsOfWorkTable: React.FC<Props> = ({ project }) => {
  const { statementsOfWork, isLoading, onDelete } =
    useStatementsOfWorkController(project.id!);

  if (isLoading) {
    return <Loading />;
  }

  const columns = [
    {
      Header: "Name",
      accessor: "name",
      width: "40%",
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
          <Link href={routes.statementOfWorkPath(id as number, projectId)}>
            {value.length > 30 ? `${value.substring(0, 30)}...` : value}
          </Link>
        );
      },
    },
    {
      Header: "Period",
      accessor: "startDate",
      width: "15%",
      Cell: ({ row }: any) => {
        const statementOfWork = row.original;

        return (
          <Box flexDirection="column" display="flex" alignItems="center">
            <Box>{formatDateToMonthDayYear(statementOfWork.startDate)} </Box>-{" "}
            <Box>{formatDateToMonthDayYear(statementOfWork.endDate)}</Box>{" "}
          </Box>
        );
      },
    },
    {
      Header: "Contract size",
      accessor: "totalRevenue",
      width: "15%",
      Cell: ({ value }: { value: number }) => {
        return toUSD(value);
      },
    },
    {
      Header: "",
      accessor: "edit-delete",
      width: "10%",
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
