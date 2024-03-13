"use client";
import { Box } from "@mui/material";
import Icon from "@mui/material/Icon";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

import { StatementOfWork } from "@/app/_domain/interfaces/StatementOfWork";
import { onDeleteAction } from "@/app/_presenters/utils/actions";
import { formatDateToMonthDayYear } from "@/app/_presenters/utils/date";
import { toUSD } from "@/app/_presenters/utils/finances";
import Button from "@/components/Button";
import DataTable from "@/components/DataTable";
import Loading from "@/components/Loading";
import routes from "@/routes";

import useStatementsOfWorkController from "../../controllers/useStatementsOfWorkController";

interface Props {
  project: Project;
}

const StatmentsOfWorkTable: React.FC<Props> = ({ project }) => {
  const { statementsOfWork, isLoading, onDelete } =
    useStatementsOfWorkController(project.id!);
  const router = useRouter();

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
        const link = routes.statementOfWorkPath(id as number, projectId);

        return (
          <Button variant="text" color="info" onClick={() => router.push(link)}>
            {value.length > 30 ? `${value.substring(0, 30)}...` : value}
          </Button>
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
            onClick={() => onDeleteAction(() => onDelete(original))}
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
