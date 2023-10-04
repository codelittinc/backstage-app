"use client";
import Card from "@mui/material/Card";
import Box from "@/components/Box";
import DashboardLayout from "@/components/LayoutContainers/DashboardLayout";
import { Grid, Icon } from "@mui/material";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";
import Loading from "@/components/Loading";
import useCustomersController from "./_presenters/_controllers/useCustomersController";
import CustomersTable from "./_presenters/_components/CustomersTable";

function Customers(): JSX.Element {
  const { customers = [], isLoading } = useCustomersController();
  const router = useRouter();

  return (
    <DashboardLayout>
      <Box>
        <Grid container>
          <Grid item xs={12} md={6}>
            <Box pb={3}>
              <Button
                variant="gradient"
                color="info"
                onClick={() => router.push(`/customers/new`)}
              >
                <Icon>add</Icon>&nbsp; Add a customer
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Card>
              {isLoading ? (
                <Loading />
              ) : (
                <CustomersTable customers={customers} />
              )}
            </Card>
          </Grid>
        </Grid>
      </Box>
    </DashboardLayout>
  );
}

export default Customers;
