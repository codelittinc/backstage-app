import React from "react";
import DataTable from "@/components/DataTable";
import Button from "@/components/Button";
import Icon from "@mui/material/Icon";
import { Repository } from "@/app/repositories/_domain/interfaces/Repository";
import { Application } from "@/app/repositories/_domain/interfaces/Application";
import { CopyToClipboard } from "react-copy-to-clipboard";
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

  const getDeploymentData = (environment: string) => {
    var message = "";
    var supportsDeploy = false;
    if (!repository.supportsDeploy) {
      message = "Update your repository to allow deploy through Roadrunner.";
      supportsDeploy = false;
    } else if (environment == "dev") {
      message = "Roadrunner is not available for dev environment.";
      supportsDeploy = false;
    } else {
      message = `/roadrunner update ${repository.name} ${environment}`;
      supportsDeploy = true;
    }

    return {
      message,
      supportsDeploy,
    };
  };

  const applicationsData = applications.map((application) => ({
    id: application.id,
    environment: application.environment,
    deployCommand: `/roadrunner update ${repository.name} ${application.environment}`,
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
      Header: "Deploy command",
      accessor: "deployCommand",
      width: "80%",
      Cell: ({ row }: any) => {
        const deploymentData = getDeploymentData(row.original.environment);
        if (deploymentData.supportsDeploy) {
          return (
            <>
              {deploymentData.message}
              <CopyToClipboard text={deploymentData.message}>
                <Button variant="text" color="info">
                  <Icon>copy</Icon>
                </Button>
              </CopyToClipboard>
            </>
          );
        } else {
          return <>{deploymentData.message}</>;
        }
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
