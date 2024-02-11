import { Icon } from "@mui/material";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import { useRouter } from "next/navigation";

import { Application } from "@/app/repositories/_domain/interfaces/Application";
import { Repository } from "@/app/repositories/_domain/interfaces/Repository";
import Box from "@/components/Box";
import Button from "@/components/Button";
import Loading from "@/components/Loading";
import Typography from "@/components/Typography";
import routes from "@/routes";

import ApplicationsTable from "./_presenters/components/ApplicationsTable";
import useApplicationsController from "./_presenters/controllers/useApplicationsController";

type Props = {
  repository: Repository;
};

function Applications({ repository }: Props): JSX.Element {
  const { applications, isLoading } = useApplicationsController(repository.id!);
  const router = useRouter();

  if (isLoading) return <Loading />;

  return (
    <Card id="applications" sx={{ overflow: "visible" }}>
      <Grid container p={3} px={3} pb={2}>
        <Grid item xs={12} display={"flex"} justifyContent={"space-between"}>
          <Typography variant="h5">Applications</Typography>
          <Box
            display="flex"
            justifyContent={{ md: "flex-end" }}
            alignItems="center"
          >
            <Button
              variant="gradient"
              color="info"
              size="small"
              onClick={() => {
                router.push(routes.newApplicationPath(repository.id as number));
              }}
            >
              <Icon>add</Icon>&nbsp; Add application
            </Button>
          </Box>
        </Grid>
      </Grid>

      {applications?.length !== 0 && (
        <Box component="form" pb={3} px={3}>
          <ApplicationsTable
            applications={applications || []}
            repository={repository}
            handleEdit={(application: Application) => {
              router.push(
                routes.applicationPath(
                  application.id as number,
                  repository.id as number
                )
              );
            }}
          />
        </Box>
      )}
    </Card>
  );
}

export default Applications;
