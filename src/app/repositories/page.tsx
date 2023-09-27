"use client";
import Card from "@mui/material/Card";
import Box from "@/components/Box";
import DashboardLayout from "@/components/LayoutContainers/DashboardLayout";
import DataTable from "@/components/DataTable";
import { useGetRepositories } from "@/api/repositories";
import StatusCell from "@/components/DataTable/StatusCell";
import Link from "next/link";
import routes from "@/routes";
import { Grid, Icon } from "@mui/material";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";

function Repositories(): JSX.Element {
  const { data: repositories } = useGetRepositories("");
  const router = useRouter();
  if (!repositories) {
    return <></>;
  }
  const columns = [
    {
      Header: "name",
      accessor: "name",
      width: "20%",
      Cell: ({ row }: any) => {
        const {
          original: { name, id },
        } = row;
        return <Link href={routes.repository_path(id)}>{name}</Link>;
      },
    },
    { Header: "owner", accessor: "owner", width: "20%" },
    {
      Header: "active",
      accessor: "active",
      width: "20%",
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
  ];

  const data = {
    columns: columns,
    rows: repositories,
  };

  return (
    <DashboardLayout>
      <Box>
        <Grid container xs={12}>
          <Grid item xs={12} md={6}>
            <Box pb={3}>
              <Button
                variant="gradient"
                color="info"
                onClick={() => router.push(`/repositories/new`)}
              >
                <Icon>add</Icon>&nbsp; Add a repository
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Card>
              <DataTable table={data} entriesPerPage={false} canSearch />
            </Card>
          </Grid>
        </Grid>
      </Box>
    </DashboardLayout>
  );
}

export default Repositories;
