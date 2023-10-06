import React from "react";
import DataTable from "@/components/DataTable";
import Button from "@/components/Button";
import Icon from "@mui/material/Icon";
import Typography from "@/components/Typography";
import { Grid } from "@mui/material";
import Box from "@/components/Box";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { getRoadrunnerUrl } from "@/api";
import { Application } from "@/app/repositories/_domain/interfaces/Application";

interface Props {
  application: Application;
}

const ApplicationsTable: React.FC<Props> = ({ application }) => {
  const columns = [
    {
      Header: "Identifier",
      accessor: "identifier",
      width: "10%",
    },
    {
      Header: "Type",
      accessor: "type",
      width: "10%",
    },
    {
      Header: "Variant",
      accessor: "variant",
      width: "10%",
    },
    {
      Header: "",
      accessor: "url",
      width: "10%",
      Cell: ({ value }: any) => {
        return (
          <CopyToClipboard text={value}>
            <Button variant="text" color="info">
              <Icon>copy</Icon>
            </Button>
          </CopyToClipboard>
        );
      },
    },
  ];

  const getDeployNotificationUrl = (
    externalIdentifier: string,
    status: string
  ) =>
    getRoadrunnerUrl(
      `/flows?status=${status}&host=${externalIdentifier}&deploy_type=deploy-notification&env=${application.environment}`
    );

  const links = application.externalIdentifiers
    ?.map((externalIdentifier) => {
      return [
        ...["success", "failure"].map((status) => ({
          identifier: externalIdentifier.text,
          type: "build",
          variant: status,
          url: getDeployNotificationUrl(externalIdentifier.text, status),
        })),
      ];
    })
    .flat();

  const data = {
    columns: columns,
    rows: links,
  };

  return (
    <Grid item xs={12}>
      <Box p={3}>
        <Typography variant="h5">Links</Typography>
      </Box>
      <DataTable
        table={data}
        entriesPerPage={false}
        isSorted={false}
        showTotalEntries={false}
      />
    </Grid>
  );
};

export default ApplicationsTable;
