"use client";
import Card from "@mui/material/Card";
import Box from "@/components/Box";
import DashboardLayout from "@/components/LayoutContainers/DashboardLayout";
import DashboardNavbar from "@/components/DashboardNavbar";
import Footer from "@/components/Footer";
import DataTable from "@/components/DataTable";
import { useGetRepositories } from "@/api/repositories";
import StatusCell from "@/components/DataTable/StatusCell";
import Link from "next/link";
import routes from "@/routes";

function Repositories(): JSX.Element {
  const { data: repositories } = useGetRepositories("");
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
      <DashboardNavbar />
      <Box my={3}>
        <Card>
          <DataTable table={data} entriesPerPage={false} canSearch />
        </Card>
      </Box>
      <Footer />
    </DashboardLayout>
  );
}

export default Repositories;
