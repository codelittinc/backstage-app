"use client";
import Card from "@mui/material/Card";
import Box from "@/components/Box";
import DashboardLayout from "@/components/LayoutContainers/DashboardLayout";
import { Grid, Icon } from "@mui/material";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";
import useRepositoriesController from "./_presenters/_controllers/useRepositoriesController";
import RepositoriesTable from "./_presenters/_components/RepositoriesTable";
import Loading from "@/components/Loading";

function Repositories(): JSX.Element {
  const { repositories = [], isLoading } = useRepositoriesController();
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
                onClick={() => router.push(`/repositories/new`)}
              >
                <Icon>add</Icon>&nbsp; Add a repository
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Card>
              {isLoading ? (
                <Loading />
              ) : (
                <RepositoriesTable repositories={repositories} />
              )}
            </Card>
          </Grid>
        </Grid>
      </Box>
    </DashboardLayout>
  );
}

export default Repositories;
