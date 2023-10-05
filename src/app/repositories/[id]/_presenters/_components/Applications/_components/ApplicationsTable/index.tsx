import React from "react";
import DataTable from "@/components/DataTable";
import Link from "next/link";
import StatusCell from "@/components/DataTable/StatusCell";
import { deleteApplication } from "@/app/repositories/[id]/_presenters/_components/Applications/_data/services/applications";
import Button from "@/components/Button";
import Icon from "@mui/material/Icon";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Repository } from "@/app/repositories/_domain/interfaces/Repository";
import { Application } from "@/app/repositories/_domain/interfaces/Application";
import { APPLICATIONS_KEY } from "../../_domain/constants";
import useApplicationsTableController from "./_presenters/_controllers/useApplicationsTableController";

interface Props {
  repository: Repository;
  applications: Application[];
  handleEdit: Function;
}

const ApplicationsTable: React.FC<Props> = ({
  applications,
  repository,
  handleEdit,
}) => {
  const { onDelete } = useApplicationsTableController({
    repository: repository,
  });
  const applicationsData = applications.map((application) => ({
    id: application.id,
    environment: application.environment,
    externalIdentifiers: application.externalIdentifiers
      ?.map((e) => e.text)
      .join(", "),
    edit: "",
    delete: "",
  }));

  const columns = [
    {
      Header: "Environment",
      accessor: "environment",
      width: "10%",
    },
    {
      Header: "External identifiers",
      accessor: "externalIdentifiers",
      width: "80%",
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
              handleEdit(applications.find((app) => app.id === id));
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
        const {
          original: { id },
        } = row;
        return (
          <Button variant="text" color="error" onClick={() => onDelete(id)}>
            <Icon>delete</Icon>
          </Button>
        );
      },
    },
  ];

  const data = {
    columns: columns,
    rows: applicationsData,
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

export default ApplicationsTable;
