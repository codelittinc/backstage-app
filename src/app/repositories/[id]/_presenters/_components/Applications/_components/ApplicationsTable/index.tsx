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
  const applicationsData = applications.map((application) => ({
    id: application.id,
    environment: application.environment,
    url: application.server?.link,
    supportsHealthCheck: application.server?.supportsHealthCheck,
    active: application.server?.active,
    edit: "",
    delete: "",
  }));

  const queryClient = useQueryClient();
  const deleteMutation = useMutation(
    (applicationId: number) => deleteApplication(repository.id!, applicationId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([APPLICATIONS_KEY, repository.id]);
      },
    }
  );

  const columns = [
    {
      Header: "Environment",
      accessor: "environment",
      width: "10%",
    },
    {
      Header: "Supports health check",
      accessor: "supportsHealthCheck",
      width: "10%",
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
    {
      Header: "Server URL",
      accessor: "url",
      width: "10%",
      Cell: ({ value }: any) => {
        if (value) {
          return (
            <Link href={value} target="_blank">
              {value}
            </Link>
          );
        } else {
          return <></>;
        }
      },
    },
    {
      Header: "Active",
      accessor: "active",
      width: "10%",
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
    {
      Header: "",
      accessor: "edit",
      width: "10%",
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
      width: "10%",
      Cell: ({ row }: any) => {
        const {
          original: { id },
        } = row;
        return (
          <Button
            variant="text"
            color="error"
            onClick={() => {
              deleteMutation.mutate(id);
            }}
          >
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
